
import {update_kf,init_kf} from "./kalman_filter.js"
let array = [[1,2,3],[4,5,6],[7,8,9]];


document.getElementById("stop_kf").disabled = true;
var kf_error =0;
var sens1_error = 0;
var sens2_error = 0;
    var canvas3 = document.getElementById("kfCanvas");
    var ctx3 = canvas3.getContext("2d");
    var x3 = Math.random()*600
    var y3 = Math.random()*400
    var theta3 = Math.random()*2*Math.PI - Math.PI
    var x_est = 18
    var y_est = 10
    var theta_est = Math.random()*2*Math.PI - Math.PI
    var theta_g3 = 0
    var omega3 = 0
    var alg = 1
    var v3 = 0
    var dist3 = 0
    var e_y3 = 0
    var e_x3 = 0
    var x_g3 = Math.random()*600
    var y_g3 = Math.random()*400
    var kp_w3 = 20
    var kp_v3 = 2
    var width = 20
    var height = 10
    var cx3 = 0
    var cy3 = 0
    var time3 = 0
    const interval3 = 50 //update every 20 miliseconds
    const sim_speed3 = 1
    const dt3 = (interval3/1000)*sim_speed3

    google.setOnLoadCallback(drawStuff5);

    var data5;
    var options;
    var chart5 = null;
    var c = 1;

    google.setOnLoadCallback(drawStuff6);

    var data6;
    var options2;
    var chart6 = null;
    var c = 1;
    var timer3 = null
    var chart_timer5 = null
    var chart_timer6 = null

    export function run_kf(){
        init_kf(x3,y3,dt3);
        document.getElementById("start_kf").disabled = true;
        document.getElementById("stop_kf").disabled = false;
        if(timer3!=null){
            clearInterval(timer3)
            data5 = new google.visualization.DataTable();
            data5.addColumn('number', 'Time');
            data5.addColumn('number', 'KF Error');
            data5.addColumn('number', 'Sensor1 Error');
            data5.addColumn('number', 'Sensor2 Error');
            data5.addRows([
                [0,0,0,0],
    ]);
            data6 = new google.visualization.DataTable();
            data6.addColumn('number', 'Time');
            data6.addColumn('number', 'Distance');
            data6.addRows([
                [0,0],
    ]);
        }

    canvas3 = document.getElementById("kfCanvas");
    ctx3 = canvas3.getContext("2d");
    x3 = 20
    y3 = 20
    theta3 = Math.random()*2*Math.PI - Math.PI
    x_est = 50
    y_est = 100
    theta_est = Math.random()*2*Math.PI - Math.PI
    theta_g3 = 0
    omega3 = 0
    v3 = 0
    dist3 = 0
    e_y3 = 0
    e_x3 = 0
    x_g3 = Math.random()*600
    y_g3 = Math.random()*400
    width = 20
    height = 10
    cx3 = 0
    cy3 = 0
    time3 = 0
    timer3 = setInterval(draw3, interval3);

    google.load('visualization', '1.1', {
    'packages': ['corechart']
});
}
    function drawRobot3() {

        ctx3.beginPath();
        cx3 = x3
        cy3 = y3
        ctx3.translate(cx3, cy3);              //translate to center of shape
        ctx3.rotate(theta3);  //rotate 25 degrees.
        ctx3.translate(-cx3, -cy3);
        ctx3.fillStyle = "#0095DD";
        ctx3.fillRect(x3-0.5*width, y3-0.5*height, width, height);
        ctx3.stroke();

        //draw front of robot
        ctx3.strokeStyle = "#808080";
        ctx3.moveTo(x3+0.5*width, y3-0.5*height);
        ctx3.lineTo(x3+0.5*width, y3+0.5*height);
        ctx3.stroke();

        //drawing wheels
        ctx3.strokeStyle = "#FF0000";
        ctx3.moveTo(x3-0.25*width, y3-0.5*height);
        ctx3.lineTo(x3+0.25*width, y3-0.5*height);
        ctx3.stroke();

        ctx3.moveTo(x3-0.25*width, y3+0.5*height);
        ctx3.lineTo(x3+0.25*width, y3+0.5*height);
        ctx3.stroke();
        ctx3.restore()


    }

    function drawRobotEstimate() {
        ctx3.beginPath();
        cx3 = x_est
        cy3 = y_est
        ctx3.translate(cx3, cy3);              //translate to center of shape
        ctx3.rotate(theta3);  //rotate 25 degrees.
        ctx3.translate(-cx3, -cy3);
        ctx3.fillStyle = "#AAAA00";
        let kf_width = 10;
        let kd_height = 5;
        ctx3.fillRect(x_est-0.5*kf_width, y_est-0.5*kd_height, kf_width, kd_height);
        ctx3.stroke();

        //draw front of robot
        ctx3.strokeStyle = "#808080";
        ctx3.moveTo(x_est+0.5*kf_width, y_est-0.5*kd_height);
        ctx3.lineTo(x_est+0.5*kf_width, y_est+0.5*kd_height);
        ctx3.stroke();

        //drawing wheels
        ctx3.strokeStyle = "#FF0000";
        ctx3.moveTo(x_est-0.25*kf_width, y_est-0.5*kd_height);
        ctx3.lineTo(x_est+0.25*kf_width, y_est-0.5*kd_height);
        ctx3.stroke();

        ctx3.moveTo(x_est-0.25*kf_width, y_est+0.5*kd_height);
        ctx3.lineTo(x_est+0.25*kf_width, y_est+0.5*kd_height);
        ctx3.stroke();
        ctx3.restore()


    }

    function kf_step() {

        
        //run go to goal
        e_y3 = y_g3 - y3;
        e_x3 = x_g3 - x3;
        theta_g3 = Math.atan2(e_y3, e_x3);
        omega3 = kp_w3 * (Math.atan2(Math.sin(theta_g3 - theta3),Math.cos(theta_g3 - theta3)));
        omega3 = (Math.abs(omega3)/omega3) * Math.min(Math.abs(omega3),Math.PI/3)
        dist3 = (Math.sqrt(Math.pow(y_g3-y3,2) + Math.pow(x_g3-x3,2)))

        v3 = kp_v3 * dist3;
        v3 = Math.min(v3,30)
        if(dist3<1)
        {
            v3=0;
        omega3=0;}
        //update robot's state estimate
        let vx = v3*Math.cos(theta3);
        let vy = v3*Math.sin(theta3);
        var result = [];
        result = update_kf(vx,vy,dt3);
        x3 = result[0];
        x_est = result[1];
        y3 = result[2];
        y_est = result[3];
        kf_error = result[4];
        sens1_error = result[5]
        sens2_error = result[6]

        
    }
   
    function draw_goal3(){
        ctx3.beginPath();
        ctx3.arc(x_g3, y_g3, 5, 0, 2 * Math.PI, false);
        ctx3.fillStyle = 'green';
        ctx3.fill();
        ctx3.lineWidth = 2;
        ctx3.strokeStyle = '#003300';
        ctx3.stroke();
        ctx3.font = "20px Lato";
        ctx3.fillText("Goal",x_g3+5,y_g3-5);
    }
    
    function draw3() {
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        draw_goal3()
        ctx3.save();
        drawRobot3();
        ctx3.save();
        drawRobotEstimate();
        kf_step();
        x3 = x3 + v3*Math.cos(theta3)*dt3;
        y3 = y3 + v3*Math.sin(theta3)*dt3;
        theta3 = theta3 + omega3*dt3
        theta3 = Math.atan2(Math.sin(theta3),Math.cos(theta3))
        time3 = time3+dt3

    }



function drawChart5() {
    // Instantiate and draw our chart, passing in some options.
    if (chart5 == null) {
        chart5 = new google.visualization.LineChart(document.getElementById('chart_div5'));
    }
    chart5.draw(data5, options);
}

function drawStuff5() {
    data5 = new google.visualization.DataTable();
    data5.addColumn('number', 'Time');
    data5.addColumn('number', 'KF Error');
    data5.addColumn('number', 'Sensor1 Error');
    data5.addColumn('number', 'Sensor2 Error');

    data5.addRows([
        [time3,kf_error,sens1_error,sens2_error],
    ]);

    // Set chart options
    options = {
        'title': "Kalman Filter Error",
            'width': 550,
            'height': 320,
            hAxis: {
          title: 'Time(s)'
        },
        vAxis: {
          title: 'Estimation Error(m)',
          viewWindow:{max: 3.5}
        }
    };
    drawChart5();
    chart_timer5 = setInterval(function() {
        data5.addRow([time3, kf_error,sens1_error,sens2_error]);
        drawChart5();
    }, 100);
};





function drawChart6() {
    // Instantiate and draw our chart, passing in some options.
    if (chart6 == null) {
        chart6 = new google.visualization.LineChart(document.getElementById('chart_div6'));
    }
    chart6.draw(data6, options2);
}

function drawStuff6() {
    data6 = new google.visualization.DataTable();
    data6.addColumn('number', 'Time');
    data6.addColumn('number', 'Distance');
    data6.addRows([
        [time3,dist3],
    ]);

    // Set chart options
    options2 = {
        'title': "Distance",
            'width': 550,
            'height': 320,
            hAxis: {
          title: 'Time(s)'
        },
        vAxis: {
          title: 'Distance to Goal(m)'
        }
    };
    drawChart6();
    chart_timer6 = setInterval(function() {
        data6.addRow([time3, dist3]);
        drawChart6();
    }, 100);
};


export function stop_kf(){
        document.getElementById("start_kf").disabled = false;
        document.getElementById("stop_kf").disabled = true;
        ctx3.clearRect(0,0,canvas3.width,canvas3.height);
        if(timer3!=null){
            clearInterval(timer3)
            data5 = new google.visualization.DataTable();
            data5.addColumn('number', 'Time');
            data5.addColumn('number', 'KF Error');
            data5.addColumn('number', 'Sensor1 Error');
            data5.addColumn('number', 'Sensor2 Error');
            data5.addRows([
                [0,0,0,0],
    ]);
            data6 = new google.visualization.DataTable();
            data6.addColumn('number', 'Time');
            data6.addColumn('number', 'Distance');
            data6.addRows([
                [0,0],
    ]);
        }

        x3 = Math.random()*600
        y3 = Math.random()*400
        x_est = 18
        y_est = 10
        theta_est = Math.random()*2*Math.PI - Math.PI
        theta3 = Math.random()*2*Math.PI - Math.PI
        theta_g3 = 0
        omega3 = 0
        alg = 1
        v3 = 0
        dist3 = 0
        e_y3 = 0
        e_x3 = 0
        x_g3 = Math.random()*600
        y_g3 = Math.random()*400

    width = 20
    height = 10
    cx3 = 0
    cy3 = 0
    time3 = 0

    }