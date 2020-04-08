var u = [];
var true_pos = [[0],[0]];
var est_pos = [];
var F = [];
var B = [];
var P = [[10, 0 ,0, 0 ],[0, 10, 0, 0 ],[0, 0, 1, 0 ],[0, 0, 0, 1 ]];

var H = [];
var Q = [];
var R = [];
var err1 = 20;
var err2 = 5.5;
var err_input = 1.5;
var Z_mem = [[0],[0],[0],[0]]
var Z = [[0],
[0],
[0],
[0]];
export function init_kf(x,y,dt){
    
        u = [[0],[0],[1],[1]];
        true_pos[0][0] = x;
        true_pos[1][0] = y;
        est_pos = [[Math.random()*600],[Math.random()*400],[0],[0]];

        F = [[1,  0 , dt, 0],
            [0,  1 , 0 , dt],
            [0 , 0,  1,  0 ],
            [0,  0,  0 , 1]];

        B = [[0, 0 ,dt, 0 ],
            [0, 0, 0, dt],
            [0, 0, 0, 0 ],
            [0, 0, 0, 0 ]];

        P = [[1, 0 ,0, 0 ],[0, 1, 0, 0 ],[0, 0, 1, 0 ],[0, 0, 0, 1 ]];

        H = [[1,  0,  0,  0 ],
            [0,  1 , 0 , 0 ],
            [1,  0 , 0 , 0 ],
            [0,  1 , 0 , 0]];

        Q = [[0,  0,  0,  0 ],
            [0,  0,  0 , 0 ],
            [0,  0,  err_input,  0 ],
            [0,  0,  0,  err_input]];

        R = [[err1,  0,  0, 0 ],
            [0,  err1,  0,  0 ],
            [0,  0,  err2,  0 ],
            [0,  0 , 0 , err2]];
           
            
}


function matrixDot(A, B) {
        var result = new Array(A.length).fill(0).map(row => new Array(B[0].length).fill(0));
    
        return result.map((row, i) => {
            return row.map((val, j) => {
                return A[i].reduce((sum, elm, k) => sum + (elm*B[k][j]) ,0)
            })
        })
    }

export function update_kf(vx,vy,dt)
{

        
    true_pos[0][0] = true_pos[0][0]+ dt * Number(u[2]);
    true_pos[1][0] = true_pos[1][0]+ dt * Number (u[3]);


    Z[0][0] = true_pos[0][0] + (gaussianRand()-0.5)*2*Math.sqrt(err1)
    Z[1][0] = true_pos[1][0] + (gaussianRand()-0.5)*2*Math.sqrt(err1)
    Z[2][0] = true_pos[0][0] +(gaussianRand()-0.5)*2*Math.sqrt(err2)
    Z[3][0] = true_pos[1][0] + (gaussianRand()-0.5)*2*Math.sqrt(err2)

    let trans_F = F[0].map((col, i) => F.map(row => row[i]));
    let trans_H = H[0].map((col, i) => H.map(row => row[i]));

    let ttt = matrixDot(F,P)
    let tttt = matrixDot(ttt,trans_F)
    let P1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
      let ind = 0
      let ind2 = 0;
      for(ind = 0;ind<Q.length;ind++){
          for(ind2=0;ind2<Q.length;ind2++){
              P1[ind][ind2] = tttt[ind][ind2]+Q[ind][ind2]
          }
      }
     ttt = matrixDot(H,P1)
     tttt = matrixDot(ttt,trans_H)
     let S = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

    for(ind = 0;ind<R.length;ind++){
        for(ind2=0;ind2<R.length;ind2++){
            S[ind][ind2] = tttt[ind][ind2]+R[ind][ind2]
        }
    }
    let inv_S = math.inv(S);

    
    //measurements update
    let temp1 = matrixDot(P1,trans_H)
    let K = matrixDot(temp1,inv_S);

    let temp2 = matrixDot(H,P1)
    let temp3 = matrixDot(K,temp2)
    for(ind = 0;ind<P1.length;ind++){
        for(ind2=0;ind2<P1.length;ind2++){
            P[ind][ind2] = P1[ind][ind2] - temp3[ind][ind2]
        }
    }

     temp2 = matrixDot(B,u)
     let t_F_est_pos = matrixDot(F,est_pos)
     let t2_plus_F_est = [[0],[0],[0],[0]];

     for(ind = 0;ind<temp2.length;ind++){
        for(ind2=0;ind2<1;ind2++){
            t2_plus_F_est[ind][ind2] = t_F_est_pos[ind][ind2] + temp2[ind][ind2]
        }
    }
     let new_temp = matrixDot(H,t2_plus_F_est)

     let Z_min_newt = [[0],[0],[0],[0]];
     for(ind = 0;ind<Z.length;ind++){
        for(ind2=0;ind2<1;ind2++){
            Z_min_newt[ind][ind2] = Z[ind][ind2] - new_temp[ind][ind2]
        }
    }

    temp1 = matrixDot(F,est_pos)
    let k_z = matrixDot(K,Z_min_newt);
    est_pos = [[0],[0],[0],[0]];
    for(ind = 0;ind<temp2.length;ind++){
        for(ind2=0;ind2<1;ind2++){
            est_pos[ind][ind2] = temp1[ind][ind2] + temp2[ind][ind2]+ k_z[ind][ind2]
        }
    }
    est_pos[2][0] = 0;
    est_pos[3][0] = 0;
    u = [[0],
    [0],
    [vx + (gaussianRand()-0.5)*2*Math.sqrt(err_input)],
    [vy + (gaussianRand()-0.5)*2*Math.sqrt(err_input)]];
    let kf_error = Math.sqrt(Math.pow(true_pos[0][0]-est_pos[0][0],2) + Math.pow(true_pos[1][0]-est_pos[1][0],2))
    let sens1_error = Math.sqrt(Math.pow(true_pos[0][0]-Z[0][0],2) + Math.pow(true_pos[1][0]-Z[1][0],2))
    let sens2_error = Math.sqrt(Math.pow(true_pos[0][0]-Z[2][0],2) + Math.pow(true_pos[1][0]-Z[3][0],2))
    console.log(P)
    return [true_pos[0][0],est_pos[0][0],true_pos[1][0],est_pos[1][0],kf_error,sens1_error,sens2_error];
}

function gaussianRand() {
    var rand = 0;
  
    for (var i = 0; i < 6; i += 1) {
      rand += Math.random();
    }
  
    return rand / 6;
  }