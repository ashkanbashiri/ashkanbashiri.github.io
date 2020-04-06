function get_repulsive_force(robot,obstacle,eta,max_dist){
    var dist3 = Math.sqrt(Math.pow(robot.x-obstacle.x,2) + Math.pow(robot.y-obstacle.y,2))
    if (dist3<= max_dist){
        var unit_vector = [(robot.x-obstacle.x)/dist3, (robot.y-obstacle.y)/dist3];
        var coeff =1
        // eta * ((1/dist3)  - (1/max_dist))*(1/(dist3));
        var force =  [eta*unit_vector[0]*coeff, eta*unit_vector[1]*coeff];
    return force

    }
    else{
        return [0, 0];
    }
}

function get_attractive_force(robot,goal,sigma){
    var force = [-sigma*(robot.x-goal.x), -sigma*(robot.y-goal.y)];
    return force;

}
export function update_speed(robot,goal,obstacle,sigma,eta,max_dist){
    var rep_force = get_repulsive_force(robot,obstacle,eta,max_dist);
    var att_force = get_attractive_force(robot,goal,sigma);
    var total_force =  [rep_force[0]+att_force[0], rep_force[1]+att_force[1]];

    return total_force;
}
