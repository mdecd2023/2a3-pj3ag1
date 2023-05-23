function sysCall_init()
    scorewallb = 0
    scorewalla = 0
    scorewalld = 0
    scorewallc = 0
    sensor = sim.getObject('./sensor')
    sensor2 = sim.getObject('./sensor2')
    sensor3 = sim.getObject('./sensor3')
    sensor4 = sim.getObject('./sensor4')
    sensor5 = sim.getObject('./sensor5')
    sensor6 = sim.getObject('./sensor6')
    bubbleRob = sim.getObject('/bubbleRob1')
    ball = sim.getObject('/ball')
    bubbleRob2 = sim.getObject('/bubbleRob2')
    initialPosition = sim.getObjectPosition(bubbleRob, -1)
    initialOrientation = sim.getObjectOrientation(bubbleRob, -1)
    initialPosition2 = sim.getObjectPosition(bubbleRob2, -1)
    initialOrientation2 = sim.getObjectOrientation(bubbleRob2, -1)
    initialballPosition = sim.getObjectPosition(ball, -1)
    initialballOrientation = sim.getObjectOrientation(ball, -1)
    
    score0={1,1,1,0,1,1,1}
    score1={0,0,1,0,0,1,0}
    score2={1,0,1,1,1,0,1}
    score3={1,0,1,1,0,1,1}
    score4={0,1,1,1,0,1,0}
    score5={1,1,0,1,0,1,1}
    score6={1,1,0,1,1,1,1}
    score7={1,0,1,0,0,1,0}
    score8={1,1,1,1,1,1,1}
    score9={1,1,1,1,0,1,1}
    score={score0,score1,score2,score3,score4,score5,score6,score7,score8,score9}
    
    for j = 0,6,1 do
        local scorea = sim.getObject('./scorea['..j..']')
            if (score[1][j+1]==1) then
                sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})
            else
                sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
            end
    end
    
    for j = 0,6,1 do
        local scoreb = sim.getObject('./scoreb['..j..']')
            if (score[1][j+1]==1) then
                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})
            else
                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
            end
    end
    
    for j = 0,6,1 do
        local scorec = sim.getObject('./scorec['..j..']')
            if (score[1][j+1]==1) then
                sim.setShapeColor(scorec, nil, sim.colorcomponent_ambient_diffuse, {0, 0, 1})
            else
                sim.setShapeColor(scorec, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
            end
    end
    
    for j = 0,6,1 do
        local scored = sim.getObject('./scored['..j..']')
            if (score[1][j+1]==1) then
                sim.setShapeColor(scored, nil, sim.colorcomponent_ambient_diffuse, {0, 0, 1})
            else
                sim.setShapeColor(scored, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
            end
    end
end


function sysCall_actuation()
    result = sim.readProximitySensor(sensor)
    if scorewallb < 10 then
        if result > 0 then
            score2 = scorewallb + 1
            for i = 0, 9, 1 do
                if score2 == i then
                    for j = 0, 6, 1 do
                        local scoreb = sim.getObject('./scoreb[' .. j .. ']')
                        if score[i + 1][j + 1] == 1 then
                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})
                        else
                            sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
                        end
                    end
                end
            end
            scorewallb = score2
            sim.setObjectPosition(ball, -1, initialballPosition)
            sim.setObjectOrientation(ball, -1, initialballOrientation)
        end
    else
        scorewallb = 0  -- ??scorewallb?0
        for j = 0, 6, 1 do
            local scoreb = sim.getObject('./scoreb[' .. j .. ']')
            if score0[j + 1] == 1 then
                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})
            else
                sim.setShapeColor(scoreb, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
            end
        end
        score3 = scorewalla + 1  -- scorewalla?1
        for i = 0, 9, 1 do
            if score3 == i then
                for j = 0, 6, 1 do
                    local scorea = sim.getObject('./scorea[' .. j .. ']')
                    if score[i + 1][j + 1] == 1 then
                        sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})
                    else
                        sim.setShapeColor(scorea, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
                    end
                end
            end
        end
        scorewalla = score3
        sim.setObjectPosition(ball, -1, initialballPosition)
        sim.setObjectOrientation(ball, -1, initialballOrientation)
    end
    if scorewallb == 9 and scorewalla == 9 then
        sim.pauseSimulation()  -- ????
    end
    
    result2 = sim.readProximitySensor(sensor2)
    if scorewalld < 10 then
        if result2 > 0 then
            score4 = scorewalld + 1
            for i = 0, 9, 1 do
                if score4 == i then
                    for j = 0, 6, 1 do
                        local scored = sim.getObject('./scored[' .. j .. ']')
                        if score[i + 1][j + 1] == 1 then
                            sim.setShapeColor(scored, nil, sim.colorcomponent_ambient_diffuse, {0, 0, 1})
                        else
                            sim.setShapeColor(scored, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
                        end
                    end
                end
            end
            scorewalld = score4
            sim.setObjectPosition(ball, -1, initialballPosition)
            sim.setObjectOrientation(ball, -1, initialballOrientation)
        end
    else
        scorewalld = 0  -- ??scorewallb?0
        for j = 0, 6, 1 do
            local scored = sim.getObject('./scored[' .. j .. ']')
            if score0[j + 1] == 1 then
                sim.setShapeColor(scored, nil, sim.colorcomponent_ambient_diffuse, {0, 0, 1})
            else
                sim.setShapeColor(scored, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
            end
        end
        score5 = scorewallc + 1  -- scorewalla?1
        for i = 0, 9, 1 do
            if score5 == i then
                for j = 0, 6, 1 do
                    local scorec = sim.getObject('./scorec[' .. j .. ']')
                    if score[i + 1][j + 1] == 1 then
                        sim.setShapeColor(scorec, nil, sim.colorcomponent_ambient_diffuse, {0, 0, 1})
                    else
                        sim.setShapeColor(scorec, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
                    end
                end
            end
        end
        scorewallc = score5
        sim.setObjectPosition(ball, -1, initialballPosition)
        sim.setObjectOrientation(ball, -1, initialballOrientation)
    end
    if scorewalld == 9 and scorewallc == 9 then
        sim.pauseSimulation()  -- ????
    end
    
    result3 = sim.readProximitySensor(sensor3)
    if result3 > 0 then
       sim.setObjectPosition(ball, -1, initialballPosition)
       sim.setObjectOrientation(ball, -1, initialballOrientation)
    end
    
    result4 = sim.readProximitySensor(sensor4)
    if result4 > 0 then
       sim.setObjectPosition(ball, -1, initialballPosition)
       sim.setObjectOrientation(ball, -1, initialballOrientation)
    end
    
    result5 = sim.readProximitySensor(sensor5)
    if result5 > 0 then
       sim.setObjectPosition(ball, -1, initialballPosition)
       sim.setObjectOrientation(ball, -1, initialballOrientation)
    end
    
    result6 = sim.readProximitySensor(sensor6)
    if result6 > 0 then
       sim.setObjectPosition(ball, -1, initialballPosition)
       sim.setObjectOrientation(ball, -1, initialballOrientation)
    end
end