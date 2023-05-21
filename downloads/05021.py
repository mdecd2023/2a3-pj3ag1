function sysCall_init()
    scorewallb = 0  -- 分數牆B的初始分數為0
    scorewalla = 0  -- 分數牆A的初始分數為0
    sensor = sim.getObject('./sensor')  -- 取得感應器的句柄
    bubbleRob = sim.getObject('/bubbleRob')  -- 取得機器人1的句柄
    ball = sim.getObject('/ball')  -- 取得球的句柄
    bubbleRob2 = sim.getObject('/bubbleRob2')  -- 取得機器人2的句柄
    initialPosition = sim.getObjectPosition(bubbleRob, -1)  -- 取得機器人1的初始位置
    initialOrientation = sim.getObjectOrientation(bubbleRob, -1)  -- 取得機器人1的初始姿態
    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)  -- 取得機器人2的初始位置
    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)  -- 取得機器人2的初始姿態
    initialballPosition = sim.getObjectPosition(ball, -1)  -- 取得球的初始位置
    initialballOrientation = sim.getObjectOrientation(ball, -1)  -- 取得球的初始姿態
     
    -- 分數牆顯示的數字0~9的顏色設定
    score0 = {1, 1, 1, 0, 1, 1, 1}
    score1 = {0, 0, 1, 0, 0, 1, 0}
    score2 = {1, 0, 1, 1, 1, 0, 1}
    score3 = {1, 0, 1, 1, 0, 1, 1}
    score4 = {0, 1, 1, 1, 0, 1, 0}
    score5 = {1, 1, 0, 1, 0, 1, 1}
    score6 = {1, 1, 0, 1, 1, 1, 1}
    score7 = {1, 0, 1, 0, 0, 1, 0}
    score8 = {1, 1, 1, 1, 1, 1, 1}
    score9 = {1, 1, 1, 1, 0, 1, 1}
    score = {score0, score1, score2, score3, score4, score5, score6, score7, score8, score9}
 
    -- 初始化分數牆A的顯示顏色
    for j = 0, 6, 1 do
        local scorea = sim.getObject('./scorea[' .. j .. ']')
        local digit = math.floor(scorewalla / (10^j)) % 10  -- 取得分數牆A的各位數字
     
        -- 檢查分數牆A對應的分數是否為1
        if score[digit + 1][j + 1] == 1 then
            sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色
        else
            sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色
        end
    end
 
    -- 初始化分數牆B的顯示顏色
    for j = 0, 6, 1 do
        local scoreb = sim.getObject('./scoreb[' .. j .. ']')
        local digit = math.floor(scorewallb / (10^j)) % 10  -- 取得分數牆B的各位數字
     
        -- 檢查分數牆B對應的分數是否為1
        if score[digit + 1][j + 1] == 1 then
            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色
        else
            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色
        end
    end
end
 
function sysCall_actuation()
    result = sim.readProximitySensor(sensor)  -- 讀取接近傳感器的值
     
    -- 檢查分數牆B的分數是否小於100
    if scorewallb < 100 then
        -- 如果接近傳感器的值大於0，就執行以下程式
        if result > 0 then
            score2 = scorewallb + 1  -- 更新分數牆B的分數
             
            -- 檢查新的分數對應的形狀顏色
            for i = 0, 9, 1 do
                if score2 == i then
                    -- 更新分數牆B的形狀顏色
                    for j = 0, 6, 1 do
                        local scoreb = sim.getObject('./scoreb[' .. j .. ']')
                        local digit = math.floor(score2 / (10^j)) % 10  -- 取得分數牆B的各位數字
                        if score[digit + 1][j + 1] == 1 then
                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色
                        else
                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色
                        end
                    end
                end
            end
             
            scorewallb = score2  -- 更新分數牆B的分數
            sim.setObjectPosition(ball, -1, initialballPosition) -- 將球的位置重設為初始位置
            sim.setObjectOrientation(ball, -1, initialballOrientation) -- 將球的方向重設為初始方向
        end
    else
        scorewallb = 0  -- 如果分數牆B的分數達到99，則將分數牆B的分數重設為0
         
        -- 更新分數牆B的形狀顏色
        for j = 0, 6, 1 do
            local scoreb = sim.getObject('./scoreb[' .. j .. ']')
            local digit = math.floor(scorewallb / (10^j)) % 10  -- 取得分數牆B的各位數字
            if score[digit + 1][j + 1] == 1 then
                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色
            else
                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色
            end
        end
         
        score3 = scorewalla + 1  -- 更新分數牆A的分數
 
        -- 更新分數牆A的形狀顏色
        for i = 0, 9, 1 do
            if score3 == i then
                for j = 0, 6, 1 do
                    local scorea = sim.getObject('./scorea[' .. j .. ']')
                    local digit = math.floor(score3 / (10^j)) % 10  -- 取得分數牆A的各位數字
                    if score[digit + 1][j + 1] == 1 then
                        sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將 scorea 物體的顏色設置為紅色
                    else
                        sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將 scorea 物體的顏色設置為白色
                    end
                end
            end
        end
        scorewalla = score3 -- 將 scorewalla 變數的值設置為 score3 的值
        sim.setObjectPosition(ball, -1, initialballPosition) -- 將 ball 物體的位置設置為初始位置
        sim.setObjectOrientation(ball, -1, initialballOrientation) -- 將 ball 物體的方向設置為初始方向
     
        -- 如果 scorewallb 和 scorewalla 都等於 99，則暫停仿真
        if scorewallb == 99 and scorewalla == 99 then
            sim.pauseSimulation()
        end
    end
end
