import { find_closest, get_dist } from "./closest_point.js";
import { update_speed } from "./potential_field.js";

var nodes = [
  [100, 100],
  [100, 150],
  [200, 144],
  [120, 70],
];
var nodes2 = [
  [400, 250],
  [400, 300],
  [300, 250],
  [300, 200],
];
var obstacle = [];
var sigma = 0.025;
var eta = 10000000;
var max_dist = 40;
var max_speed = 20;
var max_angular_velocity = Math.PI / 2;

document.getElementById("stop_obs").disabled = true;
var canvas2 = document.getElementById("obsCanvas");
var ctx2 = canvas2.getContext("2d");
var x2 = Math.random() * 600;
var y2 = Math.random() * 400;
var theta2 = Math.random() * 2 * Math.PI - Math.PI;
var theta_g2 = 0;
var omega2 = 0;
var alg = 1;
var v2 = 0;
var dist2 = 0;
var e_y2 = 0;
var e_x2 = 0;
var x_g2 = Math.random() * 600;
var y_g2 = Math.random() * 400;
var kp_w2 = 15;
var kp_v2 = 10;
var width = 20;
var height = 10;
var cx2 = 0;
var cy2 = 0;
var time2 = 0;
const interval2 = 100; //update every 20 miliseconds
const sim_speed2 = 1;
const dt2 = (interval2 / 1000) * sim_speed2;

google.setOnLoadCallback(drawStuff3);

var data3;
var options;
var chart3 = null;
var c = 1;

google.setOnLoadCallback(drawStuff4);

var data4;
var options2;
var chart4 = null;
var c = 1;
var timer2 = null;
var chart_timer3 = null;
var chart_timer4 = null;

export function run_obs() {
  document.getElementById("start_obs").disabled = true;
  document.getElementById("stop_obs").disabled = false;
  if (timer2 != null) {
    //clearInterval(timer2);
    window.cancelAnimationFrame(timer2);
    data3 = new google.visualization.DataTable();
    data3.addColumn("number", "Time");
    data3.addColumn("number", "Linear Velocity");
    data3.addRows([[0, 0]]);
    data4 = new google.visualization.DataTable();
    data4.addColumn("number", "Time");
    data4.addColumn("number", "Distance");
    data4.addRows([[0, 0]]);
  }

  canvas2 = document.getElementById("obsCanvas");
  ctx2 = canvas2.getContext("2d");
  theta_g2 = 0;
  omega2 = 0;
  v2 = 0;
  dist2 = 0;
  e_y2 = 0;
  e_x2 = 0;
  x_g2 = Math.random() * 600;
  y_g2 = Math.random() * 400;
  width = 20;
  height = 10;
  cx2 = 0;
  cy2 = 0;
  time2 = 0;
  //timer2 = setInterval(draw2, interval2);
  //timer2 = setTimeout(draw2, 1000 / interval2);
  timer2 = window.requestAnimationFrame(draw2);

  google.load("visualization", "1.1", {
    packages: ["corechart"],
  });
}
function drawRobot2() {
  width = 15;
  height = 7.5;
  ctx2.beginPath();
  cx2 = x2;
  cy2 = y2;
  ctx2.translate(cx2, cy2); //translate to center of shape
  ctx2.rotate(theta2); //rotate 25 degrees.
  ctx2.translate(-cx2, -cy2);
  ctx2.fillStyle = "#0095DD";
  ctx2.fillRect(x2 - 0.5 * width, y2 - 0.5 * height, width, height);
  ctx2.stroke();

  //draw front of robot
  ctx2.strokeStyle = "#808080";
  ctx2.moveTo(x2 + 0.5 * width, y2 - 0.5 * height);
  ctx2.lineTo(x2 + 0.5 * width, y2 + 0.5 * height);
  ctx2.stroke();

  //drawing wheels
  ctx2.strokeStyle = "#333";
  ctx2.moveTo(x2 - 0.25 * width, y2 - 0.5 * height);
  ctx2.lineTo(x2 + 0.25 * width, y2 - 0.5 * height);
  ctx2.stroke();

  ctx2.moveTo(x2 - 0.25 * width, y2 + 0.5 * height);
  ctx2.lineTo(x2 + 0.25 * width, y2 + 0.5 * height);
  ctx2.stroke();
  ctx2.restore();
}
function obstacle_avoidance_step() {
  dist2 = Math.sqrt(Math.pow(y_g2 - y2, 2) + Math.pow(x_g2 - x2, 2));
  var robot = [];
  robot.x = x2;
  robot.y = y2;
  var goal = [];
  goal.x = x_g2;
  goal.y = y_g2;
  obstacle = find_closest(x2, y2, nodes, nodes2);
  var t_obs = [];
  t_obs.x = obstacle.x;
  t_obs.y = obstacle.y;
  var tempor = update_speed(robot, goal, t_obs, sigma, eta, max_dist);
  v2 = kp_v2 * Math.sqrt(Math.pow(tempor[0], 2) + Math.pow(tempor[1], 2));
  omega2 = Math.atan2(tempor[1], tempor[0]) - theta2;
  omega2 = Math.atan2(Math.sin(omega2), Math.cos(omega2));
  v2 = Math.min(v2, max_speed);
  omega2 = omega2 * kp_w2 + 0.001;
  var o_sign = Math.abs(omega2) / omega2;
  omega2 = o_sign * Math.min(Math.abs(omega2), max_angular_velocity);
}

function draw_goal2() {
  ctx2.beginPath();
  ctx2.arc(x_g2, y_g2, 5, 0, 2 * Math.PI, false);
  ctx2.fillStyle = "green";
  ctx2.fill();
  ctx2.lineWidth = 1;
  ctx2.strokeStyle = "#003300";
  ctx2.stroke();
  ctx2.font = "20px Lato";
  ctx2.fillText("Goal", x_g2 + 5, y_g2 - 5);
}
function draw_obstacle() {
  ctx2.strokeStyle = "#FA8072";
  for (var i = 0; i < nodes.length - 1; i++) {
    ctx2.moveTo(nodes[i][0], nodes[i][1]);
    ctx2.lineTo(nodes[i + 1][0], nodes[i + 1][1]);
    ctx2.stroke();
  }
  ctx2.moveTo(nodes[i][0], nodes[i][1]);
  ctx2.lineTo(nodes[0][0], nodes[0][1]);
  ctx2.stroke();

  ctx2.strokeStyle = "#FA8072";
  for (var i = 0; i < nodes2.length - 1; i++) {
    ctx2.moveTo(nodes2[i][0], nodes2[i][1]);
    ctx2.lineTo(nodes2[i + 1][0], nodes2[i + 1][1]);
    ctx2.stroke();
  }
  ctx2.moveTo(nodes2[i][0], nodes2[i][1]);
  ctx2.lineTo(nodes2[0][0], nodes2[0][1]);
  ctx2.stroke();
}
function draw2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  draw_goal2();
  draw_obstacle();
  ctx2.save();
  drawRobot2();
  moveObstacles();
  obstacle_avoidance_step();
  if (v2 < 1) {
    stop_obs();
    return;
  }
  x2 = x2 + v2 * Math.cos(theta2) * dt2;
  y2 = y2 + v2 * Math.sin(theta2) * dt2;
  theta2 = theta2 + omega2 * dt2;
  theta2 = Math.atan2(Math.sin(theta2), Math.cos(theta2));
  time2 = time2 + dt2;
  //timer2 = setTimeout(draw2, 1000 / interval2);
  timer2 = window.requestAnimationFrame(draw2);
}

function moveObstacles() {
  let xMove1 = 2 - Math.random();
  let xMove2 = -Math.random();
  nodes.forEach((point) => {
    point[0] += xMove1;
    point[1] += xMove2;
  });
  nodes2.forEach((point) => {
    point[0] += xMove2;
    point[1] += xMove1;
  });
}

function drawChart3() {
  // Instantiate and draw our chart, passing in some options.
  if (chart3 == null) {
    chart3 = new google.visualization.LineChart(
      document.getElementById("chart_div3")
    );
  }
  chart3.draw(data3, options);
}

function drawStuff3() {
  data3 = new google.visualization.DataTable();
  data3.addColumn("number", "Time");
  data3.addColumn("number", "Linear Velocity");
  data3.addRows([[time2, v2]]);

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
  drawChart3();
  chart_timer3 = setInterval(function () {
    data3.addRow([time2, v2]);
    drawChart3();
  }, 100);
}

function drawChart4() {
  // Instantiate and draw our chart, passing in some options.
  if (chart4 == null) {
    chart4 = new google.visualization.LineChart(
      document.getElementById("chart_div4")
    );
  }
  chart4.draw(data4, options2);
}

function drawStuff4() {
  data4 = new google.visualization.DataTable();
  data4.addColumn("number", "Time");
  data4.addColumn("number", "Distance");
  data4.addRows([[time2, dist2]]);

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
  drawChart4();
  chart_timer4 = setInterval(function () {
    data4.addRow([time2, dist2]);
    drawChart4();
  }, 100);
}

export function stop_obs() {
  document.getElementById("start_obs").disabled = false;
  document.getElementById("stop_obs").disabled = true;
  //ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  if (timer2 != null) {
    //clearTimeout(timer2);
    window.cancelAnimationFrame(timer2);
    // data3 = new google.visualization.DataTable();
    // data3.addColumn("number", "Time");
    // data3.addColumn("number", "Linear Velocity");
    // data3.addRows([[0, 0]]);
    // data4 = new google.visualization.DataTable();
    // data4.addColumn("number", "Time");
    // data4.addColumn("number", "Distance");
    // data4.addRows([[0, 0]]);
  }
  nodes = [
    [100, 100],
    [100, 150],
    [200, 144],
    [120, 70],
  ];
  nodes2 = [
    [400, 250],
    [400, 300],
    [300, 250],
    [300, 200],
  ];
  x2 = Math.random() * 600;
  y2 = Math.random() * 400;
  theta2 = Math.random() * 2 * Math.PI - Math.PI;
  theta_g2 = 0;
  omega2 = 0;
  alg = 1;
  v2 = 0;
  dist2 = 0;
  e_y2 = 0;
  e_x2 = 0;
  x_g2 = Math.random() * 600;
  y_g2 = Math.random() * 400;

  width = 20;
  height = 10;
  cx2 = 0;
  cy2 = 0;
  time2 = 0;
}
