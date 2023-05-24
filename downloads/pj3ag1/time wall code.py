function sysCall_init()

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
    
    totaltime = sim.getSimulationTime()/4
    time = 1200 - totaltime

    timemtd = math.floor((time/600)%10)
    for i = 0, 9, 1 do
        if timemtd == i then
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
    timemud = math.floor((time/60)%10)
    for i = 0, 9, 1 do
        if timemud == i then
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
    timestd = math.floor((time/10)%6)
    for i = 0, 9, 1 do
        if timestd == i then
            for j = 0, 6, 1 do
                local scorec = sim.getObject('./scorec[' .. j .. ']')
                if score[i + 1][j + 1] == 1 then
                    sim.setShapeColor(scorec, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})
                else
                    sim.setShapeColor(scorec, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
                end
            end
        end
    end
    timesud = math.floor(time%10)
    for i = 0, 9, 1 do
        if timesud == i then
            for j = 0, 6, 1 do
                local scored = sim.getObject('./scored[' .. j .. ']')
                if score[i + 1][j + 1] == 1 then
                    sim.setShapeColor(scored, nil, sim.colorcomponent_ambient_diffuse, {1, 0, 0})
                else
                    sim.setShapeColor(scored, nil, sim.colorcomponent_ambient_diffuse, {1, 1, 1})
                end
            end
        end
    end
    
    if time < 1 then
        sim.pauseSimulation()
    end
end