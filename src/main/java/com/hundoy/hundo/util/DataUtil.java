package com.hundoy.hundo.util;

import com.hundoy.hundo.bean.StConfig;

/**
 * Created by zohar on 2018/2/16.
 */
public class DataUtil {
    public static void main(String[] args){
        String config = "60:1.0,40:0.7,20:0.4,15:0.2,11:0.05";

        StConfig stConfig = prepareConfig(config);

        System.out.println(calStrength(stConfig, 55));
        System.out.println(calStrength(stConfig, 70));
        System.out.println(calStrength(stConfig, 40));
        System.out.println(calStrength(stConfig, 30));
        System.out.println(calStrength(stConfig, 13));

    }

    public static StConfig prepareConfig(String config){
        String[] configArr = config.split(",");
        long[] scoreCeilArr = new long[configArr.length];
        double[] stCeilArr = new double[configArr.length];
        long minScore = 999999;
        for (int i=0; i<configArr.length; i++){
            String c = configArr[i];
            String[] carr = c.split(":");
            long scoreCeil = Long.parseLong(carr[0]);
            double stCeil = Double.parseDouble(carr[1]);

            scoreCeilArr[i] = scoreCeil;
            stCeilArr[i] = stCeil;

            if (scoreCeil<minScore) minScore = scoreCeil;
        }

        StConfig stConfig = new StConfig();
        stConfig.scoreCeilArr = scoreCeilArr;
        stConfig.stCeilArr = stCeilArr;
        stConfig.minScore = minScore;
        return stConfig;
    }

    public static double calStrength(StConfig stConfig, long score) {
        long[] scoreCeilArr = stConfig.scoreCeilArr;
        double[] stCeilArr = stConfig.stCeilArr;

        long scoreCeil = -1;
        long scoreFloor = 0;
        double stCeil = -1;
        double stFloor = 0;
        for (int i=0; i<scoreCeilArr.length; i++){
            if (scoreCeilArr[i]<score){
                scoreFloor = scoreCeilArr[i];
                stFloor = stCeilArr[i];
                if (i-1>=0){
                    scoreCeil = scoreCeilArr[i-1];
                    stCeil = stCeilArr[i-1];
                }
                break;
            }
        }

        if (scoreCeil == -1)
            return 1.0;
        double st = (stCeil-stFloor)/(scoreCeil-scoreFloor)*(score-scoreFloor)+stFloor;
        return st;
    }
}


