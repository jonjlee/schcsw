import { AppState } from 'react-native';
import { Notifications } from 'expo';
import { format, addSeconds, differenceInSeconds } from 'date-fns';

// A global manager for timers running in the app
class Timers {

  // return global singleton
  static _instance = null;
  static getInstance() {
    Timers._instance = Timers._instance || new Timers();
    return Timers._instance;
  }
  
  // All active timers: { id: { timer-details }}
  // Timer details include (see _create() for full info):
  //   paused: is timer running or paused
  //   lapsed: number of seconds since timer started
  //   duration: number of seconds to set timer for
  //   expired: has timer run for duration number of seconds
  //   startTime: Date() of when timer was started
  //   endTime: calculated Date() of when timer should be done
  timers = {};
  
  // Used to track when app goes to background
  appState = { state: null };

  constructor() {
    AppState.addEventListener('change', this._onAppStateChange);
  }
  
  // -------------------------------------------
  // Public API
  // -------------------------------------------
  // create or return an existing timer
  get = (id, options={}) => {
    const timer = this.timers[id] || this._create(id, options);
    return timer;
  }
  
  // create or replace an existing timer
  replace = (id, options={}) => {
    this.destroy(id);
    return this.get(id, options);
  }
  
  // stop and remove a timer
  destroy = (timerOrId) => {
    const timer = (typeof timerOrId === 'object') ? timerOrId : this.timers[timerOrId];
    if (timer) {
      // stop underlying timer and cancel its notification
      clearInterval(timer.timerId);
      if (timer.notificationId) {
        Notifications.cancelScheduledNotificationAsync(timer.notificationId);
      }
  
      delete this.timers[timer.id];
    }
  }
  
  // start running a given timer
  start = (timer) => {
    // don't do anything if timer doesn't exist or already running (not paused)
    if (!timer || !timer.id || !timer.paused) {
      return;
    }
    
    // Calculate end time based on number of seconds remaining
    const startTime = timer.startTime || new Date();
    const duration = timer.duration;
    const remaining = timer.duration - timer.lapsed;
    const endTime = (duration > 0 && remaining >= 0) ?
      addSeconds(new Date(), remaining) :
      timer.endTime;

    // Store start and end time
    timer.paused = false;
    timer.startTime = startTime;
    timer.endTime = endTime;

    // Schedule notification to occur if requested
    if (timer.notifyTitle || timer.notifyBody) {
      this._scheduleNotification(timer, endTime, timer.notifyTitle, timer.notifyBody);
    }

    // Call tick() every second for this timer
    timer.timerId = setInterval(this._tick.bind(this, timer), 1000);

    return timer;
  }
  
  // pause a given timer
  pause = (timer) => {
    // stop timer
    timer.timerId = clearInterval(timer.timerId);
    timer.paused = true;

    // cancel notification
    if (timer.notificationId) {
      Notifications.cancelScheduledNotificationAsync(timer.notificationId);
    }
  }
  
  // Return human readable strings for start time, end time, remaining, lapsed, and duration
  display = (timer) => {
    return {
      start: timer.startTime ? format(timer.startTime, 'h:mma') : '--',
      end: (timer.endTime && !timer.paused) ? format(timer.endTime, 'h:mma') : '--',
      remain: (timer.duration > 0) ? this._formatLapsed(timer.duration - timer.lapsed) : '',
      lapsed: this._formatLapsed(timer.lapsed),
      duration: this._formatLapsed(timer.duration),
    }
  }

  
  // -------------------------------------------
  // Helpers
  // -------------------------------------------
  // Create a new timer and return it in paused state
  _create = (id, { duration=0, onTick, onDone, notifyTitle, notifyBody }) => {
    // sanity check for duration
    duration = (duration && duration > 0) ? duration : 0;

    // Initialize empty, paused timer
    const timer = {
      // internal timer ID
      id: id,
      
      // setInterval() timer id
      timerId: null,
      
      // user callbacks
      onTick: onTick,
      onDone: onDone,
      
      // device notification details
      notificationId: null,
      notificationTime: null,
      notifyTitle: notifyTitle,
      notifyBody: notifyBody,

      // time details; duration and lapsed are in seconds
      duration: duration,
      paused: true,
      lapsed: 0,
      expired: false,
      startTime: null,
      endTime: null
    }
    
    // convenience functions, so you can do timer.start() rather than TimersInstance.start(timer)
    timer.start = this.start.bind(this, timer);
    timer.pause = this.pause.bind(this, timer);
    timer.destroy = this.destroy.bind(this, timer);
    timer.display = this.display.bind(this, timer);

    // Store and return new timer
    this.timers[id] = timer;
    return timer;
  }
  
  // Called by every timer every second
  _tick = (timer) => {
    timer.lapsed += 1;
    
    // Transition timer to expired if seconds lapsed equals set timer duration, and not already expired
    let expiring = false;
    if (timer.duration > 0 && (timer.lapsed >= timer.duration) && !timer.expired) {
      expiring = true;
      timer.expired = true;
    }

    // call user provided callbacks
    if (timer.onTick) {
      timer.onTick(timer);
    }
    if (expiring && timer.onDone) {
      timer.onDone(timer);
    }
  }
  
  // Schedule a local device notification
  _scheduleNotification = async (timer, tm, title, body) => {
    timer.notificationId = await Notifications.scheduleLocalNotificationAsync(
      {
        title: title,
        body: body,
        android: { sound: true },
        ios: { sound: true },
      },
      { time: tm },
    );
  }

  
    // detect when app is brought back to foreground (setInterval() doesn't run in background)
  _onAppStateChange = (nextAppState) => {
    const now = new Date();

    if (this.appState && this.appState.state && this.appState.state.match(/inactive|background/) && nextAppState === 'active') {
      // update all active (non-paused) timers' lapsed counters
      const lapsed = differenceInSeconds(now, this.appState.time);
      for (let timer in this.timers) {
        if (!timer.paused) {
          // subtract 1 second and call _tick to add last second so user callbacks executed correctly
          timer.lapsed = timer.lapsed + lapsed - 1;
          this._tick(timer);
        }
      }
    }
    
    // store time of last state change
    this.appState = { state: nextAppState, time: now };
  };

  // Return a human readable string representing the given number of seconds (e.g. 65s => "1:05")
  _formatLapsed = (numSecs) => {
    if (numSecs < 0) {
      return '--'
    }
    
    const hr = Math.floor(numSecs/60/60);
    const min = Math.floor((numSecs % 3600) /60);
    const sec = numSecs % 60;
    
    // if >= 1 hour, format H:MM:SS, otherwise M:SS
    const pad = (n) => (n < 10 ? '0' : '') + n;
    const hrStr = (hr > 0 ? (hr + ':') : '');
    const minStr =(hr > 0 ? pad(min) : min) + ':';
    const secStr = pad(sec)
    return hrStr + minStr + secStr;
  }
}

const TimersInstance = Timers.getInstance();

export default TimersInstance;