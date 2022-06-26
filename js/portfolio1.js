document.getElementById("stop_sim").disabled = true;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = Math.random() * 600;
var y = Math.random() * 400;
var trail = [];
var dx = 2;
var dy = -2;
var theta = Math.random() * 2 * Math.PI - Math.PI;
var theta_g = 0;
var omega = 0;
var alg = 1;
var v = 0;
var dist = 0;
var e_y = 0;
var e_x = 0;
var x_g = Math.random() * 600;
var y_g = Math.random() * 400;
var kp_w = 2;
var kp_v = 2;
var width = 20;
var height = 10;
var cx = 0;
var cy = 0;
var time = 0;
const interval = 100; //update every 20 miliseconds
const sim_speed = 1;
const dt = (interval / 1000) * sim_speed;
var max_speed = 30;

google.setOnLoadCallback(drawStuff);

var data;
var options;
var chart = null;
var c = 1;

google.setOnLoadCallback(drawStuff2);

var data2;
var options2;
var chart2 = null;
var c = 1;
timer = null;
chart_timer = null;
chart_timer2 = null;

function run_sim() {
  document.getElementById("start_sim").disabled = true;
  document.getElementById("stop_sim").disabled = false;
  if (timer != null) {
    //clearInterval(timer);
    window.cancelAnimationFrame(timer);
    data = new google.visualization.DataTable();
    data.addColumn("number", "Time");
    data.addColumn("number", "Linear Velocity");
    data.addRows([[0, 0]]);
    data2 = new google.visualization.DataTable();
    data2.addColumn("number", "Time");
    data2.addColumn("number", "Distance");
    data2.addRows([[0, 0]]);
  }

  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  x = Math.random() * 600;
  y = Math.random() * 400;
  x_g = Math.random() * 400 + 100;
  y_g = Math.random() * 250 + 50;
  theta = Math.random() * 2 * Math.PI - Math.PI;
  theta_g = 0;
  omega = 0;
  alg = 1;
  v = 0;
  dist = 0;
  e_y = 0;
  e_x = 0;

  width = 20;
  height = 10;
  cx = 0;
  cy = 0;
  time = 0;
  //timer = setInterval(draw, interval);
  //timer = setTimeout(draw, 1000 / interval);
  draw();
  //draw();

  google.load("visualization", "1.1", {
    packages: ["corechart"],
  });
}
function drawTrail() {
  for (let i = 0; i < trail.length; ++i) {
    ctx.beginPath();
    ctx.arc(trail[i].x, trail[i].y, 1, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#03e9f4";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#03e9f4";
    ctx.stroke();
    ctx.restore();
  }
}
function drawRobot() {
  ctx.beginPath();
  cx = x;
  cy = y;
  trail.push({ x: cx, y: cy });
  ctx.translate(cx, cy); //translate to center of shape
  ctx.rotate(theta); //rotate 25 degrees.
  ctx.translate(-cx, -cy);
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(x - 0.5 * width, y - 0.5 * height, width, height);
  ctx.stroke();

  //draw front of robot
  ctx.strokeStyle = "#808080";
  ctx.moveTo(x + 0.5 * width, y - 0.5 * height);
  ctx.lineTo(x + 0.5 * width, y + 0.5 * height);
  ctx.stroke();

  //drawing wheels
  ctx.strokeStyle = "#FF0000";
  ctx.moveTo(x - 0.25 * width, y - 0.5 * height);
  ctx.lineTo(x + 0.25 * width, y - 0.5 * height);
  ctx.stroke();

  ctx.moveTo(x - 0.25 * width, y + 0.5 * height);
  ctx.lineTo(x + 0.25 * width, y + 0.5 * height);
  ctx.stroke();
  ctx.restore();
}
function gtg() {
  e_y = y_g - y;
  e_x = x_g - x;
  theta_g = Math.atan2(e_y, e_x);
  omega =
    kp_w * Math.atan2(Math.sin(theta_g - theta), Math.cos(theta_g - theta));
  dist = Math.sqrt(Math.pow(y_g - y, 2) + Math.pow(x_g - x, 2));

  v = kp_v * dist;
  v = Math.min(v, max_speed);
  if (dist < 5) {
    v = 0;
    omega = 0;
  }
}

function draw_goal() {
  ctx.beginPath();
  ctx.arc(x_g, y_g, 5, 0, 2 * Math.PI, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#003300";
  ctx.stroke();
  ctx.font = "20px Lato";
  ctx.fillText("Goal", x_g + 5, y_g - 5);
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw_goal();
  ctx.save();
  drawRobot();
  drawTrail();
  gtg();
  if (v === 0) {
    stop_sim();
    return;
  }
  x = x + v * Math.cos(theta) * dt;
  y = y + v * Math.sin(theta) * dt;
  theta = theta + omega * dt;
  theta = Math.atan2(Math.sin(theta), Math.cos(theta));
  time = time + dt;
  //timer = window.setTimeout(draw, 1000 / 60);

  timer = window.requestAnimationFrame(draw);
}

function drawChart() {
  // Instantiate and draw our chart, passing in some options.
  if (chart == null) {
    chart = new google.visualization.LineChart(
      document.getElementById("chart_div")
    );
  }
  chart.draw(data, options);
}

function drawStuff() {
  data = new google.visualization.DataTable();
  data.addColumn("number", "Time");
  data.addColumn("number", "Linear Velocity");
  data.addRows([[time, v]]);

  // Set chart options
  options = {
    title: "Robot's Linear Velocity",
    width: 550,
    height: 320,
    hAxis: {
      title: "Time(s)",
    },
    vAxis: {
      title: "Linear Velocity(m/s)",
    },
  };
  drawChart();
  chart_timer = setInterval(function () {
    data.addRow([time, v]);
    drawChart();
  }, 100);
}

function drawChart2() {
  // Instantiate and draw our chart, passing in some options.
  if (chart2 == null) {
    chart2 = new google.visualization.LineChart(
      document.getElementById("chart_div2")
    );
  }
  chart2.draw(data2, options2);
}

function drawStuff2() {
  data2 = new google.visualization.DataTable();
  data2.addColumn("number", "Time");
  data2.addColumn("number", "Distance");
  data2.addRows([[time, dist]]);

  // Set chart options
  options2 = {
    title: "Distance",
    width: 550,
    height: 320,
    hAxis: {
      title: "Time(s)",
    },
    vAxis: {
      title: "Distance to Goal(m)",
    },
  };
  drawChart2();
  chart_timer2 = setInterval(function () {
    data2.addRow([time, dist]);
    drawChart2();
  }, 100);
}

function stop_sim() {
  document.getElementById("start_sim").disabled = false;
  document.getElementById("stop_sim").disabled = true;
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  window.cancelAnimationFrame(timer);
  if (timer != null) {
    //clearInterval(timer);
    //clearTimeout(timer);
    window.cancelAnimationFrame(timer);

    // data = new google.visualization.DataTable();
    // data.addColumn("number", "Time");
    // data.addColumn("number", "Linear Velocity");
    // data.addRows([[0, 0]]);
    // data2 = new google.visualization.DataTable();
    // data2.addColumn("number", "Time");
    // data2.addColumn("number", "Distance");
    // data2.addRows([[0, 0]]);
  }
  x = Math.random() * 600;
  y = Math.random() * 400;
  trail = [];
}
