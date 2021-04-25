import axios from 'axios';

export const formatDate = (date) => {
  var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
};
export const myFunction = () => {
  var y = document.getElementById("Demo");

  if (y.className.indexOf("w3-show") === -1) {
    y.className += " w3-show";


  } else {
    y.className = y.className.replace(" w3-show", "");
  }
}


export const myId = () => {

  var y = document.getElementById('Demo');
  if (y.className.indexOf("w3-show") === -1) {

    y.className += " w3-show";

  } else {

    y.className = y.className.replace(" w3-show", "");
  }
}


export const dis = async (pic, drop) => {
  return await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${pic[0]}%2C${pic[1]}%3B${drop[0]}%2C${drop[1]}?alternatives=true&geometries=geojson&steps=true&access_token=pk.eyJ1Ijoicm9oaXRjaDk4OSIsImEiOiJja2FlMmJzdnQwZmhoMnFtYjA4bnNsMXp5In0.HaSX6B7tb0Bl5VNnGPrEeA`)
    .then(res => { return res.data.routes[0] })
    .catch(err => console.log(err))
}

export const timeadd = (time, duration) => {
  const dur = parseInt(duration)
  const dsec = dur % 60;
  const dmin = dur / 60 % 60;
  const dhr = dur / 3600;
  const thr = parseInt(time.slice(0, 2));
  const tmin = parseInt(time.slice(3, 5));
  const tsec = parseInt(time.slice(6, 8));
  let carry = 0; let hr = thr + dhr; let min = tmin + dmin;
  let sec = tsec + dsec;
  if (sec >= 60) {
    sec = sec - 60;
    carry = 1;
  }
  if (carry === 1) {
    min = min + 1;
    if (min >= 60) {
      min = min - 60; carry = 1;
    } else { carry = 0; }
  } else {
    if (min >= 60) {
      min = min - 60; carry = 1;
    } else { carry = 0; }
  }


  if (carry === 1) {
    hr = hr + 1;
    if (hr >= 12) {
      hr = hr - 12; carry = 1;
    } else { carry = 0; }
  } else {
    if (hr >= 12) {
      hr = hr - 12; carry = 1;
    } else { carry = 0; }
  }
  hr = Math.floor(hr).toString();
  min = Math.floor(min).toString();
  sec = Math.floor(sec).toString();
  let day;
  if (carry === 1) {
    day = 'next day';
  } else { day = ''; }
  hr = hr.length === 2 ? hr : '0' + hr;
  min = min.length === 2 ? min : '0' + min;
  sec = sec.length === 2 ? sec : '0' + sec;
  return (`${hr}:${min}:${sec} ${day}`);
}