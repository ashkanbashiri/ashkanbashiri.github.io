
var min_dist=1000
var closest_point= []
var closest_point_temp= []
var points_per_line = 10
var denom = points_per_line +1

export function find_closest(x_r,y_r,nodes,nodes2){
    var all_points = get_all_points(nodes);
    var m = 0;
    for(m=0;m<all_points.length;m++){

        var temp_dist = get_dist([x_r,y_r],all_points[m]);
        if(temp_dist<min_dist){
            min_dist = temp_dist;
            closest_point.x = all_points[m].x;
            closest_point.y = all_points[m].y;
        }
    }

    var all_points = get_all_points(nodes2);
    var m = 0;
    for(m=0;m<all_points.length;m++){

        var temp_dist = get_dist([x_r,y_r],all_points[m]);
        if(temp_dist<min_dist){
            min_dist = temp_dist;
            closest_point.x = all_points[m].x;
            closest_point.y = all_points[m].y;
        }
    }

    return closest_point
  
}

export function get_dist(a,b){
    var dist = Math.sqrt(Math.pow(a[0]-b.x,2) + Math.pow(a[1]-b.y,2))
    return dist;
}

function get_all_points(nodes){
    var l = nodes.length
    var all_points = []
    var i = 0
    var j = 0
    var m =0
    for(i=0;i<l;i++){
        var first = []
        var second = []
        first.x = nodes[i][0];
        first.y = nodes[i][1]

        if(i==nodes.length-1){
            second.x = nodes[0][0];
            second.y = nodes[0][1];
        }
        else{
            second.x = nodes[i+1][0];
            second.y = nodes[i+1][1];
        }
        all_points.push(first)
        if(first.x==second.x)
        {
            for(j=1;j<=points_per_line;j++)
            {
                temp = []
                temp.x = first.x
                var min_y = Math.min(second.y,first.y)
                var max_y = Math.max(second.y,first.y)
                temp.y = min_y + (j/(denom))*(max_y-min_y);
                all_points.push(temp)
            }

        }
        else {

            if(first.y==second.y)
        {
            for(j=1;j<=points_per_line;j++)
            {
                var temp = []
                temp.y = first.y
                var min_x = Math.min(second.x,first.x)
                var max_x = Math.max(second.x,first.x)
                temp.x = min_x + (j/(denom))*(max_x-min_x);
                all_points.push(temp)
            }

        }
            else{
                var slope = (second.y - first.y)/(second.x-first.x)
                for(j=1;j<=points_per_line;j++)
            {
                temp = []

                    temp.x = first.x + (j/(denom))*(second.x-first.x) 
                    temp.y = slope*(j/(denom))*(second.x-first.x) + first.y
                
                all_points.push(temp)
            }

                }


        }
        

    }
  return all_points;
}


