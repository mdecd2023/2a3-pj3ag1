var tipuesearch = {"pages": [{'title': 'About', 'text': '成員： \n 41023114\xa0\xa0 http://[2001:288:6004:17:2023:cda:1:1]:23020/ \n 41023118\xa0\xa0 http://[2001:288:6004:17:2023:cda:1:2]:23020/ \n 組長41023119  http://[2001:288:6004:17:2023:cda:1:3]:23020/ \n 41023120\xa0\xa0 http://[2001:288:6004:17:2023:cda:1:4]:23020/ \n 41023122 \xa0 http://[2001:288:6004:17:2023:cda:1:5]:23020/ \n 41023124\xa0  http://[2001:288:6004:17:2023:cda:1:6]:23020/ \n 41023126\xa0\xa0 http://[2001:288:6004:17:2023:cda:1:7]:23020/ \n 41023138\xa0  http://[2001:288:6004:17:2023:cda:1:8]:23020/ \n 倉儲 :   https://github.com/mdecd2023/2a3-pj3ag1 \n 網站 : https://mdecd2023.github.io/2a3-pj3ag1/content/index.html \n https://mde.tw/pjcopsim \n \n', 'tags': '', 'url': 'About.html'}, {'title': 'pj2', 'text': '\n', 'tags': '', 'url': 'pj2.html'}, {'title': 'pj2ag1', 'text': "4/17\xa0 4人操控 bubbleRob 利用 remote API server 錄製的影片 \n \n remote API 程式 \n # pip install pyzmq cbor\nfrom zmqRemoteApi import RemoteAPIClient\nimport keyboard\nimport sim\nimport time\nimport simConst\n\nprint('Program started')\nsim.simxFinish(-1) # just in case, close all openㄋed connections\nclientID=sim.simxStart('192.168.1.35',19997,True,True,5000,5)\nsim.simxStartSimulation(clientID, sim.simx_opmode_oneshot_wait)\n\nif clientID!=-1:\n    print('Connected to remote API server')\nelse:\n    print('Failed connecting to remote API server')\n\nprint('Simulation started')\n\nerrorCode, leftMotor = sim.simxGetObjectHandle(clientID, 'leftMotor', sim.simx_opmode_oneshot_wait)\nerrorCode, rightMotor = sim.simxGetObjectHandle(clientID, 'rightMotor', sim.simx_opmode_oneshot_wait)\n\ndef setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):\n    errorCode, leftMotor = sim.simxGetObjectHandle(clientID, '/leftMotor', sim.simx_opmode_oneshot_wait)\n    errorCode, rightMotor = sim.simxGetObjectHandle(clientID, '/rightMotor',sim.simx_opmode_oneshot_wait)\n    sim.simxSetJointTargetVelocity(clientID, leftMotor, leftWheelVelocity, simConst.simx_opmode_streaming)\n    sim.simxSetJointTargetVelocity(clientID, rightMotor, rightWheelVelocity, simConst.simx_opmode_streaming)\n\n'''\n# Example usage 1:\nsetBubbleRobVelocity(1.0, 1.0)\ntime.sleep(2)\nsetBubbleRobVelocity(0.0, 0.0)\n'''\n# use keyborad to move BubbleRob\n\nwhile True:\n    if keyboard.is_pressed('w'):\n        setBubbleRobVelocity(2.0, 2.0)\n    elif keyboard.is_pressed('s'):\n        setBubbleRobVelocity(-2.0, -2.0)\n    elif keyboard.is_pressed('a'):\n        setBubbleRobVelocity(-2.0, 2.0)\n    elif keyboard.is_pressed('d'):\n        setBubbleRobVelocity(2.0, -2.0)\n    elif keyboard.is_pressed('q'):\n        # stop simulation\n        sim.stopSimulation()\n    else:\n        setBubbleRobVelocity(0.0, 0.0) \n \n 控制 remote API 檔案： bubbleRob_zmq_green_red_example.7z \n 遇到問題：一開始本組是利用三台教室電腦及一台筆電，開始模擬時唯獨筆電無法操控 bubbleRob，後來發現網路必需都要連至同一個 Wi-Fi 才能 zmqRemoteAPI 的操控。 \n 5/1\xa0 加入足球場景的記分板 \n 因為在連線中，軟件中的計分板，分數無法顯示在連線的雙方的螢幕上，因此要加入的記分板，以顯示在雙方的得分數在連線的螢幕上。 \n \n 經過討論本組所可執行的方案有兩種 \n 1.利用機械式使用馬達直接傳動 \n 2.利用程式控制顏色改變計分板分數 \n \n 以下是利用機械式紀分板 \n \n 機械式計分器 計分器變換方式使用 馬達直接傳動 \n \n \n 5/6 完成機械式記分板機構模型 \n 第一版 \n \n \n 在coppliasim中模擬放置 \n \n 程式部分正在研究及討論 \n 5/8 經過討論後機械式計分板所需程式太過繁瑣，所以參考七段顯示器的概念修改計時器為顏色控制 \n 記分板 prt 檔及 stl 檔： score1.prt 、 score1_1.stl \n 以下是圖片效果展示 \n \n 5/10 進球後可以控制個位數記分板更改分數 \n 以下是程式註解及影片 \n function sysCall_init()\n    scorewallb = 0  -- 累計分數 b\n    scorewalla = 0  -- 累計分數 a\n    sensor = sim.getObject('./sensor')  -- 感測器物件\n    bubbleRob = sim.getObject('/bubbleRob')  -- 機器人物件\n    ball = sim.getObject('/ball')  -- 球物件\n    bubbleRob2 = sim.getObject('/bubbleRob2')  -- 第二個機器人物件\n    initialPosition = sim.getObjectPosition(bubbleRob, -1)  -- 機器人的初始位置\n    initialOrientation = sim.getObjectOrientation(bubbleRob, -1)  -- 機器人的初始姿態\n    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)  -- 第二個機器人的初始位置\n    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)  -- 第二個機器人的初始姿態\n    initialballPosition = sim.getObjectPosition(ball, -1)  -- 球的初始位置\n    initialballOrientation = sim.getObjectOrientation(ball, -1)  -- 球的初始姿態\n    \n    -- 分數的設定\n    score0={1,1,1,0,1,1,1}\n    score1={0,0,1,0,0,1,0}\n    score2={1,0,1,1,1,0,1}\n    score3={1,0,1,1,0,1,1}\n    score4={0,1,1,1,0,1,0}\n    score5={1,1,0,1,0,1,1}\n    score6={1,1,0,1,1,1,1}\n    score7={1,0,1,0,0,1,0}\n    score8={1,1,1,1,1,1,1}\n    score9={1,1,1,1,0,1,1}\n    score={score0,score1,score2,score3,score4,score5,score6,score7,score8,score9}\n    \n    -- 設定每個計分牆的顏色\n    for j = 0,6,1 do\n        local scoreb = sim.getObject('./scoreb['..j..']')\n        -- 如果 score[1][j+1] 等於 1，將計分牆設定為紅色；否則設定為白色\n        if (score[1][j+1]==1) then\n            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})\n        else\n            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})\n        end\n    end\nend\n\nfunction sysCall_actuation()\n    result=sim.readProximitySensor(sensor)  -- 讀取感測器的結果\n    if(scorewallb<9)then\n        if(result>0)then\n            score2 = scorewallb+1  -- 更新分數\n            -- 判斷分數並更新計分牆的顏色\n            for i= 0,9,1 do\n                if (score2 == i)then\n                    for j = 0,6,1 do\n                        local scoreb = sim.getObject('./scoreb['..j..']')\n                        -- 如果 score[i+1][j+1] 等於 1，將計分牆設定為紅色；否則設定為白色\n                        if (score[i+1][j+1]==1) then\n                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})\n                        else\n                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})\n                        end\n                    end\n                end\n            end\n            --sim.pauseSimulation()\n            scorewallb=score2  -- 更新累計分數\n            sim.setObjectPosition(ball, -1, initialballPosition)  -- 重置球的位置\n            sim.setObjectOrientation(ball, -1, initialballOrientation)  -- 重置球的姿態\n        end\n    else\n        sim.pauseSimulation()  -- 暫停模擬\n    end\nend \n \n \n \n 經過程式編譯可以更新十位數及個位數記分板分數，而以下是程式註解及影片 \n function sysCall_init()\n    scorewallb = 0  -- 分數牆B的初始分數為0\n    scorewalla = 0  -- 分數牆A的初始分數為0\n    sensor = sim.getObject('./sensor')  -- 取得感應器的句柄\n    bubbleRob = sim.getObject('/bubbleRob')  -- 取得機器人1的句柄\n    ball = sim.getObject('/ball')  -- 取得球的句柄\n    bubbleRob2 = sim.getObject('/bubbleRob2')  -- 取得機器人2的句柄\n    initialPosition = sim.getObjectPosition(bubbleRob, -1)  -- 取得機器人1的初始位置\n    initialOrientation = sim.getObjectOrientation(bubbleRob, -1)  -- 取得機器人1的初始姿態\n    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)  -- 取得機器人2的初始位置\n    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)  -- 取得機器人2的初始姿態\n    initialballPosition = sim.getObjectPosition(ball, -1)  -- 取得球的初始位置\n    initialballOrientation = sim.getObjectOrientation(ball, -1)  -- 取得球的初始姿態\n    \n    -- 分數牆顯示的數字0~9的顏色設定\n    score0 = {1, 1, 1, 0, 1, 1, 1}\n    score1 = {0, 0, 1, 0, 0, 1, 0}\n    score2 = {1, 0, 1, 1, 1, 0, 1}\n    score3 = {1, 0, 1, 1, 0, 1, 1}\n    score4 = {0, 1, 1, 1, 0, 1, 0}\n    score5 = {1, 1, 0, 1, 0, 1, 1}\n    score6 = {1, 1, 0, 1, 1, 1, 1}\n    score7 = {1, 0, 1, 0, 0, 1, 0}\n    score8 = {1, 1, 1, 1, 1, 1, 1}\n    score9 = {1, 1, 1, 1, 0, 1, 1}\n    score = {score0, score1, score2, score3, score4, score5, score6, score7, score8, score9}\n\n    -- 初始化分數牆A的顯示顏色\nfor j = 0, 6, 1 do\n    local scorea = sim.getObject('./scorea[' .. j .. ']')\n    \n    -- 檢查分數牆A對應的分數是否為1\n    if (score[1][j+1]==1) then\n        sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色\n    else\n        sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色\n    end\nend\n    -- 初始化分數牆B的顯示顏色\nfor j = 0, 6, 1 do\n    local scoreb = sim.getObject('./scoreb[' .. j .. ']')\n    \n    -- 檢查分數牆B對應的分數是否為1\n    if (score[1][j+1]==1) then\n        sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色\n    else\n        sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色\n    end\nend\n\nfunction sysCall_actuation()\n    result = sim.readProximitySensor(sensor)  -- 讀取接近傳感器的值\n    \n    -- 檢查分數牆B的分數是否小於10\n    if scorewallb < 10 then\n        -- 如果接近傳感器的值大於0，就執行以下程式\n        if result > 0 then\n            score2 = scorewallb + 1  -- 更新分數牆B的分數\n            \n            -- 檢查新的分數對應的形狀顏色\n            for i = 0, 9, 1 do\n                if score2 == i then\n                    -- 更新分數牆B的形狀顏色\n                    for j = 0, 6, 1 do\n                        local scoreb = sim.getObject('./scoreb[' .. j .. ']')\n                        if score[i + 1][j + 1] == 1 then\n                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色\n                        else\n                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色\n                        end\n                    end\n                end\n            end\n            \n            scorewallb = score2  -- 更新分數牆B的分數\n            sim.setObjectPosition(ball, -1, initialballPosition) -- 將球的位置重設為初始位置\n            sim.setObjectOrientation(ball, -1, initialballOrientation) -- 將球的方向重設為初始方向\n        end\n    else\n        scorewallb = 0  -- 如果分數牆B的分數達到9，則將分數牆B的分數重設為0\n        \n        -- 更新分數牆B的形狀顏色\n        for j = 0, 6, 1 do\n            local scoreb = sim.getObject('./scoreb[' .. j .. ']')\n            if score0[j + 1] == 1 then\n                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色\n            else\n                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色\n            end\n        end\n        \n        score3 = scorewalla + 1  -- 更新分數牆A的分數\n\n    -- 更新分數牆A的形狀顏色\n        for i = 0, 9, 1 do\n          if score3 == i then\n            for j = 0, 6, 1 do\n                local scorea = sim.getObject('./scorea[' .. j .. ']')\n                if score[i + 1][j + 1] == 1 then\n                    sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將 scorea 物體的顏色設置為紅色\n                else\n                    sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將 scorea 物體的顏色設置為白色\n                end\n            end\n          end\n        end\n        scorewalla = score3 -- 將 scorewalla 變數的值設置為 score3 的值\n        sim.setObjectPosition(ball, -1, initialballPosition) -- 將 ball 物體的位置設置為初始位置\n        sim.setObjectOrientation(ball, -1, initialballOrientation) -- 將 ball 物體的方向設置為初始方向\n    \n    -- 如果 scorewallb 和 scorewalla 都等於 9，則暫停仿真\n    if scorewallb == 9 and scorewalla == 9 then\n        sim.pauseSimulation()\n    end\nend \n \n \n", 'tags': '', 'url': 'pj2ag1.html'}, {'title': '41023114', 'text': "w10 \n 1.What is zmqRemoteAPI, and how does it relate to CoppeliaSim? \n \xa0 \xa0zmqRemoteAPI是什麼，它如何與CoppeliaSim相關聯？ \n answer: \n zmqRemoteAPI 是 CoppeliaSim 提供的一個用於遠端控制仿真場景的工具。它基於 ZeroMQ 庫實現，可以在 Python、MATLAB、C++、Java、Octave 等多種編程語言中使用。使用 zmqRemoteAPI，可以通過編程控制 CoppeliaSim 中的機器人、傳感器、物體等各種元件，實現自動化控制、遠端操作、仿真驗證等功能。 因此，zmqRemoteAPI 是 CoppeliaSim 中的一個重要功能，使得使用者可以通過編程方式控制和操作仿真場景中的各種元件，進而實現更加靈活和高效的仿真操作。 \n 5.Can you give an example of a project or task that you could complete using zmqRemoteAPI in CoppeliaSim? \n \xa0 \xa0能否舉一個使用zmqRemoteAPI在CoppeliaSim中完成的項目或任務的例子？\xa0 \n answer:以下是一個使用 \xa0 CoppeliaSim \xa0 的 \xa0 zmqRemoteAPI \xa0 控制機械臂自動抓取物體的 \xa0 Python \xa0 程序 \n \n \n import sim import time # 定義物體的名稱和位置\nobject_name = 'Cuboid' object_position = [-0.2, 0.5, 0.1] # 連接 CoppeliaSim sim.simxFinish(-1) clientID = sim.simxStart('127.0.0.1', 19999, True, True, 5000, 5) \nif clientID != -1: print('Connected to remote API server') # 取得機械臂控制句柄\nerrorCode, robot_handle = sim.simxGetObjectHandle(clientID, 'UR3', sim.simx_opmode_blocking) # 取得物體控制句柄\nerrorCode, object_handle = sim.simxGetObjectHandle(clientID, object_name, sim.simx_opmode_blocking) # 移動機械臂到指定位置\ntarget_position = [-0.2, 0.5, 0.2] sim.simxSetObjectPosition(clientID, robot_handle, -1, target_position, sim.simx_opmode_blocking) # 機械臂夾取物體 sim.simxSetObjectParent(clientID, object_handle, robot_handle, True, sim.simx_opmode_blocking) # 移動機械臂到指定位置\nsim.simxSetObjectPosition(clientID, robot_handle, -1, object_position, sim.simx_opmode_blocking) # 釋放夾爪\nsim.simxSetObjectParent(clientID, object_handle, -1, True, sim.simx_opmode_blocking) # 移動機械臂到指定位置\nsim.simxSetObjectPosition(clientID, robot_handle, -1, target_position, sim.simx_opmode_blocking) # 斷開與 CoppeliaSim 的連接\nsim.simxFinish(clientID) else: print('Failed connecting to remote API server') time.sleep(1) \n 這個 \xa0 Python \xa0 程序通過 \xa0 CoppeliaSim \xa0 的 \xa0 zmqRemoteAPI \xa0 連接到 \xa0 CoppeliaSim \xa0 仿真環境，控制機械臂移動到指定位置，夾取物體並將其移動到另一個位置，最後釋放夾爪。這個程序可以應用於機械臂自動化抓取和放置物體的項目或任務。 \n \n 遇到問題：一開始本組是利用三台教室電腦及一台筆電，開始模擬時唯獨筆電無法操控 bubbleRob，後來發現網路必需都要連至同一個 Wi-Fi 才能 zmqRemoteAPI 的操控。 \n", 'tags': '', 'url': '41023114.html'}, {'title': '41023119', 'text': 'pj2 製作內容 \n 4人操控 bubbleRob 利用 remote API server 錄製的影片 \n \n remote API 程式 \n # pip install pyzmq cbor\nfrom zmqRemoteApi import RemoteAPIClient\nimport keyboard\nimport sim\nimport time\nimport simConst\n\nprint(\'Program started\')\nsim.simxFinish(-1) # just in case, close all openㄋed connections\nclientID=sim.simxStart(\'192.168.1.35\',19997,True,True,5000,5)\nsim.simxStartSimulation(clientID, sim.simx_opmode_oneshot_wait)\n\nif clientID!=-1:\n    print(\'Connected to remote API server\')\nelse:\n    print(\'Failed connecting to remote API server\')\n\nprint(\'Simulation started\')\n\nerrorCode, leftMotor = sim.simxGetObjectHandle(clientID, \'leftMotor\', sim.simx_opmode_oneshot_wait)\nerrorCode, rightMotor = sim.simxGetObjectHandle(clientID, \'rightMotor\', sim.simx_opmode_oneshot_wait)\n\ndef setBubbleRobVelocity(leftWheelVelocity, rightWheelVelocity):\n    errorCode, leftMotor = sim.simxGetObjectHandle(clientID, \'/leftMotor\', sim.simx_opmode_oneshot_wait)\n    errorCode, rightMotor = sim.simxGetObjectHandle(clientID, \'/rightMotor\',sim.simx_opmode_oneshot_wait)\n    sim.simxSetJointTargetVelocity(clientID, leftMotor, leftWheelVelocity, simConst.simx_opmode_streaming)\n    sim.simxSetJointTargetVelocity(clientID, rightMotor, rightWheelVelocity, simConst.simx_opmode_streaming)\n\n\'\'\'\n# Example usage 1:\nsetBubbleRobVelocity(1.0, 1.0)\ntime.sleep(2)\nsetBubbleRobVelocity(0.0, 0.0)\n\'\'\'\n# use keyborad to move BubbleRob\n\nwhile True:\n    if keyboard.is_pressed(\'w\'):\n        setBubbleRobVelocity(2.0, 2.0)\n    elif keyboard.is_pressed(\'s\'):\n        setBubbleRobVelocity(-2.0, -2.0)\n    elif keyboard.is_pressed(\'a\'):\n        setBubbleRobVelocity(-2.0, 2.0)\n    elif keyboard.is_pressed(\'d\'):\n        setBubbleRobVelocity(2.0, -2.0)\n    elif keyboard.is_pressed(\'q\'):\n        # stop simulation\n        sim.stopSimulation()\n    else:\n        setBubbleRobVelocity(0.0, 0.0) \n \n 控制 remote API 檔案： bubbleRob_zmq_green_red_example.7z \n 遇到問題：一開始本組是利用三台教室電腦及一台筆電，開始模擬時唯獨筆電無法操控 bubbleRob，後來發現網路必需都要連至同一個 Wi-Fi 才能 zmqRemoteAPI 的操控。 \n 5/8 經過討論後機械式計分板所需程式太過繁瑣，所以參考七段顯示器的概念修改計時器為顏色控制 \n 記分板 prt 檔及 stl 檔： score1.prt 、 score1_1.stl \n 以下是圖片效果展示 \n \n 5/10 進球後可以控制個位數記分板更改分數 \n 以下是程式註解及影片 \n function sysCall_init()\n    scorewallb = 0  -- 累計分數 b\n    scorewalla = 0  -- 累計分數 a\n    sensor = sim.getObject(\'./sensor\')  -- 感測器物件\n    bubbleRob = sim.getObject(\'/bubbleRob\')  -- 機器人物件\n    ball = sim.getObject(\'/ball\')  -- 球物件\n    bubbleRob2 = sim.getObject(\'/bubbleRob2\')  -- 第二個機器人物件\n    initialPosition = sim.getObjectPosition(bubbleRob, -1)  -- 機器人的初始位置\n    initialOrientation = sim.getObjectOrientation(bubbleRob, -1)  -- 機器人的初始姿態\n    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)  -- 第二個機器人的初始位置\n    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)  -- 第二個機器人的初始姿態\n    initialballPosition = sim.getObjectPosition(ball, -1)  -- 球的初始位置\n    initialballOrientation = sim.getObjectOrientation(ball, -1)  -- 球的初始姿態\n    \n    -- 分數的設定\n    score0={1,1,1,0,1,1,1}\n    score1={0,0,1,0,0,1,0}\n    score2={1,0,1,1,1,0,1}\n    score3={1,0,1,1,0,1,1}\n    score4={0,1,1,1,0,1,0}\n    score5={1,1,0,1,0,1,1}\n    score6={1,1,0,1,1,1,1}\n    score7={1,0,1,0,0,1,0}\n    score8={1,1,1,1,1,1,1}\n    score9={1,1,1,1,0,1,1}\n    score={score0,score1,score2,score3,score4,score5,score6,score7,score8,score9}\n    \n    -- 設定每個計分牆的顏色\n    for j = 0,6,1 do\n        local scoreb = sim.getObject(\'./scoreb[\'..j..\']\')\n        -- 如果 score[1][j+1] 等於 1，將計分牆設定為紅色；否則設定為白色\n        if (score[1][j+1]==1) then\n            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})\n        else\n            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})\n        end\n    end\nend\n\nfunction sysCall_actuation()\n    result=sim.readProximitySensor(sensor)  -- 讀取感測器的結果\n    if(scorewallb<9)then\n        if(result>0)then\n            score2 = scorewallb+1  -- 更新分數\n            -- 判斷分數並更新計分牆的顏色\n            for i= 0,9,1 do\n                if (score2 == i)then\n                    for j = 0,6,1 do\n                        local scoreb = sim.getObject(\'./scoreb[\'..j..\']\')\n                        -- 如果 score[i+1][j+1] 等於 1，將計分牆設定為紅色；否則設定為白色\n                        if (score[i+1][j+1]==1) then\n                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})\n                        else\n                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})\n                        end\n                    end\n                end\n            end\n            --sim.pauseSimulation()\n            scorewallb=score2  -- 更新累計分數\n            sim.setObjectPosition(ball, -1, initialballPosition)  -- 重置球的位置\n            sim.setObjectOrientation(ball, -1, initialballOrientation)  -- 重置球的姿態\n        end\n    else\n        sim.pauseSimulation()  -- 暫停模擬\n    end\nend \n \n \n \n 經過程式編譯可以更新十位數及個位數記分板分數，而以下是程式註解及影片 \n function sysCall_init()\n    scorewallb = 0  -- 分數牆B的初始分數為0\n    scorewalla = 0  -- 分數牆A的初始分數為0\n    sensor = sim.getObject(\'./sensor\')  -- 取得感應器的句柄\n    bubbleRob = sim.getObject(\'/bubbleRob\')  -- 取得機器人1的句柄\n    ball = sim.getObject(\'/ball\')  -- 取得球的句柄\n    bubbleRob2 = sim.getObject(\'/bubbleRob2\')  -- 取得機器人2的句柄\n    initialPosition = sim.getObjectPosition(bubbleRob, -1)  -- 取得機器人1的初始位置\n    initialOrientation = sim.getObjectOrientation(bubbleRob, -1)  -- 取得機器人1的初始姿態\n    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)  -- 取得機器人2的初始位置\n    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)  -- 取得機器人2的初始姿態\n    initialballPosition = sim.getObjectPosition(ball, -1)  -- 取得球的初始位置\n    initialballOrientation = sim.getObjectOrientation(ball, -1)  -- 取得球的初始姿態\n    \n    -- 分數牆顯示的數字0~9的顏色設定\n    score0 = {1, 1, 1, 0, 1, 1, 1}\n    score1 = {0, 0, 1, 0, 0, 1, 0}\n    score2 = {1, 0, 1, 1, 1, 0, 1}\n    score3 = {1, 0, 1, 1, 0, 1, 1}\n    score4 = {0, 1, 1, 1, 0, 1, 0}\n    score5 = {1, 1, 0, 1, 0, 1, 1}\n    score6 = {1, 1, 0, 1, 1, 1, 1}\n    score7 = {1, 0, 1, 0, 0, 1, 0}\n    score8 = {1, 1, 1, 1, 1, 1, 1}\n    score9 = {1, 1, 1, 1, 0, 1, 1}\n    score = {score0, score1, score2, score3, score4, score5, score6, score7, score8, score9}\n\n    -- 初始化分數牆A的顯示顏色\nfor j = 0, 6, 1 do\n    local scorea = sim.getObject(\'./scorea[\' .. j .. \']\')\n    \n    -- 檢查分數牆A對應的分數是否為1\n    if (score[1][j+1]==1) then\n        sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色\n    else\n        sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色\n    end\nend\n    -- 初始化分數牆B的顯示顏色\nfor j = 0, 6, 1 do\n    local scoreb = sim.getObject(\'./scoreb[\' .. j .. \']\')\n    \n    -- 檢查分數牆B對應的分數是否為1\n    if (score[1][j+1]==1) then\n        sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色\n    else\n        sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色\n    end\nend\n\nfunction sysCall_actuation()\n    result = sim.readProximitySensor(sensor)  -- 讀取接近傳感器的值\n    \n    -- 檢查分數牆B的分數是否小於10\n    if scorewallb < 10 then\n        -- 如果接近傳感器的值大於0，就執行以下程式\n        if result > 0 then\n            score2 = scorewallb + 1  -- 更新分數牆B的分數\n            \n            -- 檢查新的分數對應的形狀顏色\n            for i = 0, 9, 1 do\n                if score2 == i then\n                    -- 更新分數牆B的形狀顏色\n                    for j = 0, 6, 1 do\n                        local scoreb = sim.getObject(\'./scoreb[\' .. j .. \']\')\n                        if score[i + 1][j + 1] == 1 then\n                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色\n                        else\n                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色\n                        end\n                    end\n                end\n            end\n            \n            scorewallb = score2  -- 更新分數牆B的分數\n            sim.setObjectPosition(ball, -1, initialballPosition) -- 將球的位置重設為初始位置\n            sim.setObjectOrientation(ball, -1, initialballOrientation) -- 將球的方向重設為初始方向\n        end\n    else\n        scorewallb = 0  -- 如果分數牆B的分數達到9，則將分數牆B的分數重設為0\n        \n        -- 更新分數牆B的形狀顏色\n        for j = 0, 6, 1 do\n            local scoreb = sim.getObject(\'./scoreb[\' .. j .. \']\')\n            if score0[j + 1] == 1 then\n                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將形狀的顏色設定為紅色\n            else\n                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將形狀的顏色設定為白色\n            end\n        end\n        \n        score3 = scorewalla + 1  -- 更新分數牆A的分數\n\n    -- 更新分數牆A的形狀顏色\n        for i = 0, 9, 1 do\n          if score3 == i then\n            for j = 0, 6, 1 do\n                local scorea = sim.getObject(\'./scorea[\' .. j .. \']\')\n                if score[i + 1][j + 1] == 1 then\n                    sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0}) -- 將 scorea 物體的顏色設置為紅色\n                else\n                    sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1}) -- 將 scorea 物體的顏色設置為白色\n                end\n            end\n          end\n        end\n        scorewalla = score3 -- 將 scorewalla 變數的值設置為 score3 的值\n        sim.setObjectPosition(ball, -1, initialballPosition) -- 將 ball 物體的位置設置為初始位置\n        sim.setObjectOrientation(ball, -1, initialballOrientation) -- 將 ball 物體的方向設置為初始方向\n    \n    -- 如果 scorewallb 和 scorewalla 都等於 9，則暫停仿真\n    if scorewallb == 9 and scorewalla == 9 then\n        sim.pauseSimulation()\n    end\nend \n \n \n w10製作內容 \n 更改及融入課程後的答案 由41023119 呂承劼製作 \n 1.What is zmqRemoteAPI, and how does it relate to CoppeliaSim? \n \n answer：zmqRemoteAPI 是應用程序可以連接CoppeliaSim的幾種方式之一。 zmqRemoteAPI 允許從外部應用程序或遠程硬件（例如實際機器人、遠程計算機等）控制模擬（或模擬器本身）。它提供了所有API功能，這些功能也可以通過CoppeliaSim腳本使用：這包括所有常規API功能（即sim.-type函數），還包括所有API功能由插件提供（例如simOMPL。，simUI。*，simIK。*等），如果啟用的狀況下。 zmqRemoteAPI 函數通過 ZeroMQ 及其與 CoppeliaSim 和 zmqRemoteAPI 附加組件的接口插件與CoppeliaSim 進行交互。所有這些都是對用戶隱藏的。遠程API可以讓一個或多個外部應用程序以步進方式（即與每個模擬步驟同步）或非步進方式（即正常操作模式）與CoppeliaSim交互，甚至支持遠程控制模擬器（例如，遠程加載場景，開始、暫停或停止模擬）。 請參閱programming/zmqRemoteApi文件夾或其相關存儲庫以獲取示例。 \n 參考： https://www.coppeliarobotics.com/helpFiles/en/zmqRemoteApiOverview.htm \n \n 2.How do you establish a connection between a Python script and CoppeliaSim using zmqRemoteAPI? \n \n answer：必須先導入 ZeroMQ 和 CBOR \n \n $ /path/to/python -m pip install pyzmq\n$ /path/to/python -m pip install cbor \n 將 Python 遠端 API 項目的位置添加到 Python 的 sys.path 或 PYTHONPATH 環境變量中也會很有幫助。 \n $ export PYTHONPATH=/path/to/zmqRemoteApi/clients/python \n 以下是一個非常簡單的 ZeroMQ 遠端 API 客戶端代碼示例，它會啟動模擬器並運行一個 3 秒的步進模擬： \n import time\nfrom zmqRemoteApi import RemoteAPIClient\n\nclient = RemoteAPIClient()\nsim = client.getObject(\'sim\')\n\nclient.setStepping(True)\n\nsim.startSimulation()\nwhile (t := sim.getSimulationTime()) < 3:\n    s = f\'Simulation time: {t:.2f} [s]\'\n    print(s)\n    client.step()\nsim.stopSimulation() \n 參考： https://www.coppeliarobotics.com/helpFiles/en/zmqRemoteApiOverview.htm \n \n 3.What are some common use cases for zmqRemoteAPI in CoppeliaSim? \n \n answer：以下是從 CoppeliaSim 資料夾所提供的示範程式 \n \n # Make sure to have the server side running in CoppeliaSim:\n# in a child script of a CoppeliaSim scene, add following command\n# to be executed just once, at simulation start:\n#\n# simRemoteApi.start(19999)\n#\n# then start simulation, and run this program.\n#\n# IMPORTANT: for each successful call to simxStart, there\n# should be a corresponding call to simxFinish at the end!\n\ntry:\n    import sim\nexcept:\n    print (\'--------------------------------------------------------------\')\n    print (\'"sim.py" could not be imported. This means very probably that\')\n    print (\'either "sim.py" or the remoteApi library could not be found.\')\n    print (\'Make sure both are in the same folder as this file,\')\n    print (\'or appropriately adjust the file "sim.py"\')\n    print (\'--------------------------------------------------------------\')\n    print (\'\')\n\nimport time\n\nprint (\'Program started\')\nsim.simxFinish(-1) # just in case, close all opened connections\nclientID=sim.simxStart(\'192.168.56.1\',19997,True,True,5000,5) # Connect to CoppeliaSim\nif clientID!=-1:\n    print (\'Connected to remote API server\')\n\n    # Now try to retrieve data in a blocking fashion (i.e. a service call):\n    res,objs=sim.simxGetObjects(clientID,sim.sim_handle_all,sim.simx_opmode_blocking)\n    if res==sim.simx_return_ok:\n        print (\'Number of objects in the scene: \',len(objs))\n    else:\n        print (\'Remote API function call returned with error code: \',res)\n\n    time.sleep(2)\n\n    # Now retrieve streaming data (i.e. in a non-blocking fashion):\n    startTime=time.time()\n    sim.simxGetIntegerParameter(clientID,sim.sim_intparam_mouse_x,sim.simx_opmode_streaming) # Initialize streaming\n    while time.time()-startTime < 1:\n        returnCode,data=sim.simxGetIntegerParameter(clientID,sim.sim_intparam_mouse_x,sim.simx_opmode_buffer) # Try to retrieve the streamed data\n        if returnCode==sim.simx_return_ok: # After initialization of streaming, it will take a few ms before the first value arrives, so check the return code\n            print (\'Mouse position x: \',data) # Mouse position x is actualized when the cursor is over CoppeliaSim\'s window\n        time.sleep(0.005)\n\n    # Now send some data to CoppeliaSim in a non-blocking fashion:\n    sim.simxAddStatusbarMessage(clientID,\'這個 Python remote API 將會連續執行 1 秒鐘, 歡迎進入 CoppeliaSim 的虛擬世界!\',sim.simx_opmode_oneshot)\n\n    # Before closing the connection to CoppeliaSim, make sure that the last command sent out had time to arrive. You can guarantee this with (for example):\n    sim.simxGetPingTime(clientID)\n\n    # Now close the connection to CoppeliaSim:\n    sim.simxFinish(clientID)\nelse:\n    print (\'Failed connecting to remote API server\')\nprint (\'Program ended\') \n \n 4.What are the advantages and disadvantages of using zmqRemoteAPI compared to other methods of communication between Python and CoppeliaSim? \n answer：使用zmqRemoteAPI相比其他Python與CoppeliaSim之間的通訊方法，優點是可以讓使用者從外部應用程式或遠端硬體（如真實機器人、遠程電腦等）控制模擬（或模擬器本身），並提供了所有API函數，包括常規API函數和由插件提供的API函數（例如simOMPL、simUI、simIK等）。此外，使用zmqRemoteAPI可以讓一個或多個外部應用程式以同步或非同步方式與CoppeliaSim互動，甚至支持遠程控制模擬器。 缺點是使用zmqRemoteAPI需要較高的程式設計知識，而且需要較多的設置和配置才能建立連接。同時，使用zmqRemoteAPI也可能會對CoppeliaSim的效能產生一定的影響，因此在實現具體項目時需要仔細考慮使用zmqRemoteAPI是否適合。 \n \n 以下是 Coppelia Robotics forums 中使用者在網站上提出的問題： https://forum.coppeliarobotics.com/viewtopic.php?t=9809 \n \n 5.Can you give an example of a project or task that you could complete using zmqRemoteAPI in CoppeliaSim? \n \n answer：以下是在課程上利用 zmqRemoteAPI 在 CoppeliaSim 中完成四人連線控制機器人之影片 \n \n', 'tags': '', 'url': '41023119.html'}, {'title': '41023126', 'text': '5/1討論機械式計分器 \n 有三種方式 \n 第一種 使用凸輪機構 \n \n 資料圖片來源 : https://www.instructables.com/Mechanical-Digital-Clock/ \n 第二種 馬達直接傳動 \n \n 第三種\xa0ㄇ型固定座 馬達 \n \n \n 5/6 設計出機械式記分板 \n \n 利用onshape 所繪製 連結網址: scoreboard 第一版 \n 在coppeliasim中模擬放置 \n \n', 'tags': '', 'url': '41023126.html'}, {'title': '41023138', 'text': 'w10 \n 問題:What are the advantages and disadvantages of using zmqRemoteAPI compared to other methods of communication between Python and CoppeliaSim? \n answer: \n 優點： \n 跨平台：zmqRemoteAPI基於ZeroMQ庫實現，支持跨平台通信，因此可以輕鬆地在Windows、Mac和Linux等操作系統上使用。 \n 高效性：zmqRemoteAPI的通信速度非常快，比其他通信方法如socket和pipe等更加高效，這對於需要快速傳輸大量數據的應用場景非常有利。 \n 易於使用：使用zmqRemoteAPI進行通信非常簡單，只需要在Python腳本中導入相關庫，創建一個ZeroMQ套接字並與CoppeliaSim建立連接即可。 設置靈活：zmqRemoteAPI的設置非常靈活，可以根據需要對其進行自定義設置，例如可以設置超時時間、心跳機制等。 \n 缺點： \n 依賴庫較多：使用zmqRemoteAPI需要安裝和導入多個庫，包括zmq庫和zmqRemoteAPI庫，這增加了開發和維護的複雜度。 \n 需要CoppeliaSim的支持：zmqRemoteAPI需要CoppeliaSim進行支持，因此需要在CoppeliaSim的腳本中進行相應的設置。 \n 總的來說，使用zmqRemoteAPI作為Python和CoppeliaSim之間通信的方法具有許多優點，但也存在一些缺點。開發者可以根據具體應用場景選擇最適合的通信方式。 \n', 'tags': '', 'url': '41023138.html'}, {'title': 'pj2ag3', 'text': '1.製作實體記分板 \n \xa0 \n 記分板檔案 \n 2.記分板 程式 \n \xa0 得分後球會回到中心球員不會回到原來的地方 剩下的還在討論 記分板草圖 \n 第一版帶有記分板+場地 \n \n 導入 新場地 \n \xa0 \n 第二版添加記分板程式  \n \xa0 \n 得分後球會回到中心球員不會回到原來的地方 記分板會計分 \n \n 製作大小與尺寸 \n \n \n \n \n \n \n   \n \n \n \n \n', 'tags': '', 'url': 'pj2ag3.html'}, {'title': 'pj3', 'text': "分工表 \n 1.場地設置 41023118 41023138 \n 2.車子設計與組裝 41023122 41023124 \n 3.輪盤記分板繪製 41023126 41023114 \n 4.輪盤記分板程式 41023119\xa041023120 \n 5.車子控制程式與設置 41023119 41023120 \n 6.會議記錄 41023126 \n 7.整體組合 41023119 \n 5/15 \n 完成輪盤記分板-editer:41023126 \n \n \n \n onshape: 輪盤記分板 \n stl檔: wall \xa0 countboard  .ttt檔: pj3 \n 第二版: pj3-2 \n 5/23 目前進度 \n 完成組員：41023119 \n 組合 scene 及 model \n 加入足球場 scene \n 加入八個機器人 \n 加入 LED 記分板及機械式計分版 \n 加入 LED 記分板程式及出界重置球的程式 \n \n 以下是記分板及出界程式 \n 記分板程式： score wall code \n 機械式記分板程式未完成 \n 機器人控制程式未完成 \n 計時器及程式未完成 \n 目前 football ttt 檔： newbing_bubbleRob_football pj3 \n 5/24 目前進度 \n 完成組員：41023119 \n 加入計時器及程式 \n \n \n 以下是計時器及計時器程式 \n 計時器程式： time wall code \n 機械式記分板程式未完成 \n 機器人控制程式未完成 \n 目前 football ttt 檔： newbing_bubbleRob_football pj3 add time \n 5/25 目前進度 \n 執行機器人控制程式後發現輪子在前進並轉彎時會解體，如下圖 \n \n 已找到發現問題點，問題出在車子輪子與馬達座標沒重疊，導致程式出現錯誤 \n 機器人車子正在修改 \n 機器人控制程式： zmq_ipv6_bubbleRob1 \n 機械式記分板程式未完成 \n 機器人控制程式出現問題正在解決 \n 以上完成組員：41023119 \n 增加齒輪傳動 記分板 \n 增加齒輪傳動 記分板 - editer:41023126 \n \n onshape: 輪盤記分板 第三版 \n stl檔: countboard-3 \n 增加齒輪記分板.ttt 檔: newbing_bubbleRob_football pj3 add countboard.ttt \n 5/29 目前進度 增加10齒  輪盤計時器-editor:41023126 \n \n \n 10teeth.stl檔: countboard-10teeth.stl \n onshape: 10teeth-countboard ' \n 機械式記分板程式未完成 \n 機器人控制程式出現問題正在解決 \n 6/1 目前進度 \n editer:41023126 \n 記分板程式與轉盤無法作動 但是大致上有了方向 \n \n .ttt檔: scoreboard4-undone .ttt \n 問題:程式並沒有發現錯誤但是輪盤計分板還是無法作動 \n 推測有可能的問題 \n 1.可能轉軸的參數設定錯誤 \n 2.主動軸與從動軸設定有誤 \n 在模擬中的問題 \n [CoppeliaSim:warning]   Detected\xa0dynamically\xa0enabled,\xa0non-convex\xa0shapes.\xa0Those\xa0might\xa0drastically\xa0slow\xa0down\xa0simulation,\xa0and\xa0introduce\xa0unstable\xa0behaviour. \n [CoppeliaSim:warning]   Detected\xa0a\xa0static,\xa0respondable\xa0shape,\xa0built\xa0on\xa0top\xa0of\xa0a\xa0non-static\xa0tree.\xa0This\xa0might\xa0lead\xa0to\xa0strange\xa0and\xa0unrealistic\xa0behaviour. \n chatgpt上的回覆 \n [CoppeliaSim:warning] 偵測到動態啟用的非凸形狀，可能會大幅降低模擬速度並導致不穩定的行為。 [CoppeliaSim:warning] 偵測到靜態的可回應形狀建立在非靜態樹上，這可能導致奇怪和不真實的行為。 \n 這些警告表示在場景中檢測到一些問題。第一個警告表示檢測到使用非凸形狀的動態物體，這可能會使模擬速度變慢並引入不穩定的行為。建議您優化場景，使用凸形狀的物體，或減少非凸形狀物體的數量。 \n 第二個警告指出檢測到一個靜態的可回應形狀，建立在非靜態樹的頂部。這可能會導致奇怪和不真實的行為。建議您檢查場景中物體的層次結構和約束，確保它們的設置正確，並符合您期望的行為。 \n 完成組員：41023119 \n 轉盤式記分板先參考  2a3-pj3ag4  的模型及程式 \n 以下是 ttt 檔案： newbing_bubbleRob_football pj3 add score \n", 'tags': '', 'url': 'pj3.html'}, {'title': '場地設置', 'text': '完成組員：41023118、41023138 \n 0515 \n 足球場檔案 \n \n \n 0520 更新足球場規格 0522 檔案 \n \n \n 5/28 更新足球場規格 0529 場地 \n \n', 'tags': '', 'url': '場地設置.html'}, {'title': '車子設計與組裝', 'text': '完成組員：41023124 \n \n 0515第一版車子設計 \n \xa0 \n \n \n \n \n \n \n   \n \n 0522車子檔案 \n \n \n \n \n \xa0 \n \n \n \n \n \n \n \n   \n \n 0522-2 \n \n \n 0604-車子背號設計(方便識別與操控) \n \n \n \xa0 \n \n \n 0604車子設計與背號', 'tags': '', 'url': '車子設計與組裝.html'}, {'title': '輪盤記分板繪製', 'text': '5/15 \n 完成輪盤記分板-editer:41023126 \n \n \n onshape: 輪盤記分板 \n stl檔: wall \xa0 countboard  .ttt檔: pj3 \n \n 顏色怪怪的 換第二版-editer:41023126 \n \n .ttt檔: pj3-2.ttt \n 5/25 增加齒輪傳動 記分板 \n 第三版 輪盤記分板-editer:41023126 \n \n \n onshape: 輪盤記分板 第三版 \n stl檔: countboard-3 \n 導入coppeliasim 場景-editer:41023126 \n \n \n .ttt檔: countboard.ttt檔 \n 5/29 增加10齒  輪盤計時器-editor:41023126 \n \n \n 10teeth.stl檔: countboard-10teeth.stl \n onshape: 10teeth-countboard \n 10齒計分板  上色編輯零件名子-editer:41023114 \n \n \n 10尺齒輪: 4-10teeth2.ttt \n 5/31 發現新版coppeliasim 4.5.1  零件分解後會出現座標偏移 \n \n \n', 'tags': '', 'url': '輪盤記分板繪製.html'}, {'title': '輪盤記分板程式', 'text': '3位數記分板程式 \n 第一版 \n 還沒試驗 \n', 'tags': '', 'url': '輪盤記分板程式.html'}, {'title': '車子控制程式與設置', 'text': '完成組員：41023120 \n 第一版 zmqRemoteApi_IPv6 \xa0 \n 還是連不到組長電腦 \n 第二版 zmqRemoteApi_IPv6  6/1 \n 待試驗 \n 完成組員：41023119 \n 車子連線控制檔案： football pj3.7z \n 目前 \n 5/25 目前進度 \n 執行機器人控制程式後發現輪子在前進並轉彎時會解體，如下圖 \n \n 已找到發現問題點，問題出在車子輪子與馬達座標沒重疊，導致程式出現錯誤 \n 機器人車子正在修改 \n 機器人控制程式： zmq_ipv6_bubbleRob1 \n 機械式記分板程式未完成 \n 機器人控制程式出現問題正在解決 \n', 'tags': '', 'url': '車子控制程式與設置.html'}, {'title': '組裝', 'text': '完成組員：41023120 \n 第一版 導入場地和車子 \n \xa0 \n 第二版 導入場地和車子 \n \n 5/26 計時板會計時 記分板可以計分但還是2位數 輪盤不受控制旋轉待解決 \n 完成組員：41023119 \n 5/23 目前進度 \n 組合 scene 及 model \n 加入足球場 scene \n 加入八個機器人 \n 加入 LED 記分板及機械式計分版 \n 加入 LED 記分板程式及出界重置球的程式 \n \n 以下是記分板及出界程式 \n 記分板程式： score wall code \n 機械式記分板程式未完成 \n 機器人控制程式未完成 \n 計時器及程式未完成 \n 目前 football ttt 檔： newbing_bubbleRob_football pj3 \n 5/24 目前進度 \n 加入計時器及程式 \n \n \n 以下是計時器及計時器程式 \n 計時器程式： time wall code \n 機械式記分板程式未完成 \n 機器人控制程式未完成 \n 目前 football ttt 檔： newbing_bubbleRob_football pj3 add time \n 5/25 目前進度 \n 執行機器人控制程式後發現輪子在前進並轉彎時會解體，如下圖 \n \n 已找到發現問題點，問題出在車子輪子與馬達座標沒重疊，導致程式出現錯誤 \n 機器人車子正在修改 \n 機器人控制程式： zmq_ipv6_bubbleRob1 \n 機械式記分板程式未完成 \n 機器人控制程式出現問題正在解決', 'tags': '', 'url': '組裝.html'}, {'title': 'meeting minutes', 'text': '5/18 會議內容:分配工作 \n \n 會議詳細內容 \n 分工表 \n 1.場地設置 41023118 41023138 \n 2.車子設計與組裝 41023122 41023124 \n 3.輪盤記分板繪製 41023126 41023114 \n 4.輪盤記分板程式 41023119\xa041023120 \n 5.車子控制程式與設置 41023119 41023120 \n \n 5/22\xa0會議內容:討論分工的作業情況及尚未完成的事項 \n \n 會議詳細內容 \n 41023124:車子設計大略完成 剩下背號 \n 41023120:程式研究中 \n 41023118:場地大致完成 剩下球場線條 \n 41023119:機械式記分板程式正在編寫中\xa0球員程式正在編寫中 \n 41023126:機械記分板 改第二版 \n 41023138:場地大致完成 剩下球場線條 \n 41023122:球員除錯 \n 41023114:機械記分板外觀研究 \n 5/29 會議內容:討論作業情況及 模擬場景連線 \n \n 會議詳細內容 \n 41023122:車子剩下背號 \n 41023119:球員程式正在修改中 \n 41023138:場景完成 \n 和組長做模擬場景連線 \n', 'tags': '', 'url': 'meeting minutes.html'}, {'title': 'note', 'text': '課程筆記 \n', 'tags': '', 'url': 'note.html'}, {'title': '組員連線步驟', 'text': '完成組員：41023120 \n 1.關掉防火牆 \n \xa0 \n 2.點擊進階設定 \n \xa0 \n 3.組長點擊輸入規則，組員則點擊輸出規則 \n \xa0 \n 4.接著點選新增規則，點選連接埠，規則選擇TCP，接著設定特定 連接埠 為23000-23050 \n \xa0 \n \xa0 \n 5.選擇允許連線 \n \xa0 \n \n \xa0 \n 6.接著設定名稱 \n \xa0 \n 7.設置老師規定的IPv6位置\xa0 \n 範例 \n cda pj3 第一組的第一位組員的指定 IP  2001:288:6004:17:2023:cda:1:1 \n \xa0 \n 8.接著將各組的zmq打開，注意zmq以及CoppeliaSim(4.5.1)需選擇有支援IPv6的版本  zmq 檔案 6/1 \n \xa0 \n 10.然後在瀏覽器打\xa0  http://[組長IP]:23020 就可以看到組長場景並連線對戰 \n 範例 http://[2001:288:6004:17:2023:cd:0:1]:23020\xa0', 'tags': '', 'url': '組員連線步驟.html'}, {'title': 'stud2.cycu.org', 'text': '資料連結: team-cad2022-w5 \n step 1：Login to https://mail.nfu.edu.tw - 查看登入 stud2.cycu.org 伺服器的密碼, 帳號為 cd+學號, 密碼為四個字元, 包括數字與小寫英文字母，並查詢 stud.cycu.org 中與帳號對應的近端 (給 127.0.0.1 使用, 9 開頭的 port) 與遠端 (給 stud.cycu.org, 8 開頭的 port) 埠號  step 2：修改可攜 Python 3.10.6 start.bat, 蓋掉第三行後重新啟動, 目的希望將操作系統的命令搜尋路徑放在可攜目錄搜尋路徑之後.  step 3：重新啟動可攜程式環境, 在其中一個命令列, ssh\xa0 cd+學號@stud2.cycu.org, 表示要使用 secure shell 遠端登入到 stud2.cycu.org, 這是一台 Linux 主機, 安裝 Ubuntu 22.04 Server.(若使用的網路連線協定並無 IPv6,\xa0 可將系統的 proxy 設為 140.130.17.4:3128 kmolab/kmolab)  step 4：在 ssh 登入畫面, 以 ssh-keygen 建立 key pairs, .ssh/id_rsa 為 private key, id_rsa.pub 為 public key  step 5：設法利用 Filezilla, 以 sftp 安全的(Secure)檔案(File)傳輸(Transmission)協定(Protocol), 與 stud.cycu.org 伺服器連結.  step 6：利用\xa0 Filezilla sftp 取下 id_rsa.pub, 登錄至 Github 帳號下的 Setting - >\xa0 SSH and GPG keys.  step 7：對 server sftp 也可以利用\xa0 Filezilla portable, 以圖形介面完成. 而 ssh 也可以透過\xa0 putty.exe 執行遠端登入.  step 8：接下來要下載\xa0 config 設定檔案,\xa0 以 sftp 放入 stud2.cycu.org 主機的 .ssh 目錄中.  step 9：接下來要在\xa0 Ubuntu (也就是 stud.cycu.org 這台主機所安裝的操作系統) 中, 設定 .gitconfig, 總共包含三項設定: git config --global user.name "scrum-1", git config --global user.email\xa0 "scrum1@mde.tw"\xa0\xa0 以及 git config --global http.proxy http://p42.cycu.org:3128, 這三個設定必須在 ssh 登入畫面中執行, 設定完成檔案會存入帳號根目錄中的 .gitconfig \xa0 step 10：接著下載 server.py, 在 Windows 編輯 server.py, 將個人分配到的 9xxxx 埠號填入後存檔, 以 sftp 放入上列取下的倉儲根目錄.  會使用的指令： pwd 代表 print working directory, clear - 清除螢幕 cd - 更換目錄 ls -l - 列出目錄詳細內容 chmod u+x acp - 表示讓 user 可以 execute acp script (能夠讓使用者以 source acp 加上提交字串進行 git add, git commit, git push, 如何在 Windows 執行 acp.bat 加上提交字串.  ps axo pid,comm,user | grep "python3" - 表示要找出使用 python3 執行的 process, 列出其 process id, command 以及 user kill -9 - 移除 python3 執行的 process id \n', 'tags': '', 'url': 'stud2.cycu.org.html'}, {'title': 'w14 IP設置', 'text': '\n \n \n \n \n \n   \n \n \n \n \n', 'tags': '', 'url': 'w14 IP設置.html'}, {'title': '連線不了問題', 'text': "前幾周分完8人一組，遇到同步不了的問題 \n 問題: \n error: Your local changes to the following files would be overwritten by merge: server.py Please commit your changes or stash them before you merge. Aborting \n 解決辦法: \n 這個錯誤是由於你在合併(merge)操作之前,當地目錄中的“server.py'文件有未提交的 修改所致·要解決這個問題,你可以執行以下步驟: \n 1.確認你對“server.py'文件的修改是否重要,如果是的話,你可能想先提交這些修改。 2.如果你不想提交這些修改,你可以使用otaoh命令将它們暫存起來·請運行以下命令: \n git stash 3.接著,你可以執行合併操作·使用合併而令乑合併分支(比如 'master分支): git merge <branch-name> \n \n", 'tags': '', 'url': '連線不了問題.html'}, {'title': 'coppeliaSimEdu_4.5.1座標偏移', 'text': '\n \n 問題:零件分解後，單個零件座標會偏移 \n 解決方法:先在\xa0CoppeliaSimEdu_4.4.0_rev0中，先編輯後再加到新版coppeliaSimEdu_4.5.1中 \n \n', 'tags': '', 'url': 'coppeliaSimEdu_4.5.1座標偏移.html'}, {'title': 'progress', 'text': 'week13 ： 討論旋轉式記分板 \n 41023114 \n 41023118 \n 場地完成 \n 41023119 \n 建立網站及加入 pj2 ag2 資料 \n 41023120 \n 加入 pj3 分工資料 \n 41023122 \n 41023124 \n 設計車子第一版 \n 41023126 \n 輪盤記分板完成 \n 5/18 會議記錄 \n 41023138 \n 完成場地 \n week14 ： 討論 pj3 專案 \n 41023114 \n 41023118 \n 41023119 \n 組合場地及加入記分板程式、出界程式 \n 加入計時器及計時器程式 \n 41023120 \n 41023122 \n 41023124 \n 41023126 \n 齒輪傳動記分板 \n 5/22\xa0 會議記錄 \n 41023138 \n 修改場地 \n week15 : \xa0 討論\xa0 pj3 專案及 組員連線場地及修改問題 \n 41023114 \n 41023118 \n 41023119 \n 41023120 \n 41023122 \n 41023124 \n 41023126 \n 4/29\xa0 會議記錄 \n 10齒 齒輪傳動記分板 \n 41023138', 'tags': '', 'url': 'progress.html'}]};