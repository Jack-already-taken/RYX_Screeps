# Design of Mining at Beginning Part

[TOC]

## Role

通过角色区分提升效率，角色在必要时进行转换。此文档只包含起步期采矿时所需的角色。在具体的角色下将会给出指导性的身体部分，主要工作，优先级，何时需要转换角色等。

### Harvester

身体部分：[WORK,CARRY,MOVE]

任务：仅在energy不足以及初始阶段生成，在能量足够后转换为miner，继任者直接生成位miner。发现energy source后采集，所获取的energy直接放在carry部分，不往地上丢弃。

优先级：采矿>搬运>升级

转换：在出现第一个hauler时转换角色为miner。

### Miner

身体部分： [WORK×6,CARRY,MOVE]

任务：发现energy source后采集，并且直接丢弃在地上等待carrier回收。

优先级：采矿

转换：当前房间energy资源耗竭时转为builder或判断剩余等待时间是否应当去往其他房间采矿。切换为防守模式时部分转换为fixer。如果在一段时间内掉落的energy持续呈增长状态并且spawn没在制造hauler，向当前房间的*任务板*[^1]发布建造hauler任务，如有upgrade任务位置，转换为Upgrader *Type B*。


### Upgrader

身体部分： [WORK×6,CARRY,MOVE]

任务：接受建construct指令并建造structure，能量由hauler提供。如能量耗竭，向当前房间的发布energy补充任务。

优先级：升级

转换：当前房间任务板没有升级任务/资源不足时转换为miner(Type B优先转换)。切换为防守模式时部分转换为Fixer *Type B*。如果当前房间没有升级任务，miner数量属于饱和状态，查看是否有空闲的builder任务位置，如有，则转换为builder。

### Builder

身体部分： [WORK×6,CARRY,MOVE]

任务：接受建construct指令并建造structure，能量由hauler提供。如能量耗竭，向当前房间的发布energy补充任务。在闲时进行修复任务。

优先级：建造>修复

转换：当前房间任务板没有建造任务/资源不足时转换为miner(Type B优先转换)。切换为防守模式时部分转换为Fixer *Type B*。如果当前房间没有建造任务，miner数量属于饱和状态，查看是否有空闲的upgrader任务位置，如有，则转换为upgrader 。

### Hauler

身体部分：[CARRY×2,MOVE] (当有road时)(后期) [CARRY×2,MOVE×2] (当没有road时)(前期) (因为此角色设计较为复杂，身体部件应当灵活调整)

任务：将散落的energy、矿搬运至出存储或生产场地：查看任务板，如果没有任务，则默认搬运散矿至最近存储，如有则直接搬运散矿到工地。查看散矿数量并根据carry部件reserve相对数量的散矿，此时该数量散矿对于其他非优先的hauler不可见。(尝试这一设计能否减少针对发货地和目的地在同一房间时的中转时间)。如果没有散矿则从离工地最近的存储搬运。

优先级：任务板任务(通常为到工地)>搬运到存储

转换：当任务板没有任务，预测一段时间内地上没有散矿，转换为scout(待定)。

### Fixer

身体部分：[WORK×6,CARRY,MOVE]

任务：防守模式下修复各个仅供防御用的建筑。预测能量消耗直接发布到任务板设置为最高优先级。调用可用hauler。

优先级：墙/城墙>塔>其他

转换：非防守模式下，且无空闲修复任务位置时按需转换为upgrader或builder(Type B优先转换)。

[^1]: 参考*两大设计模式* ->任务驱动。

## 任务板(Task Board)

任务板分为全局任务板和房间任务板，screeps应当优先响应全局任务板。(全局任务板待定)

### 房间任务板

对每个房间设置一个任务版用于布置任务，为后期从角色驱动转为任务驱动做准备。

发布任务时应当指定以下内容：

- 发布者
- 发布时间
- 目标
- 位置
- 所需身体部件(范围)以及对应的creep数量
- 当前状态
- 优先度

关于当前状态：发布时：待执行。第一个creep加入后：执行中。执行完成后保留一个tick(可能防止某些bug)：完成。如因一些原因而暂停：暂停。

### 数量控制系统

有点复杂先咕了

## Reference

[Question on Roles](https://screeps.com/forum/topic/913/questions-on-roles/3)

[Screeps Doc-zh](https://screeps-cn.github.io/global-objects.html)

[Screeps API-zh](https://screeps-cn.github.io/api/)

[Screeps Doc-en](https://docs.screeps.com/index.html)

[Screeps API-en](https://docs.screeps.com/api/)

[两大设计模式](https://www.jianshu.com/p/7226e08c4b8e)

[数量控制系统](https://www.jianshu.com/p/d5e1a50473ce)

[Screeps入坑指南](https://www.jianshu.com/p/da5ffe2c22ee)

[Screeps进阶技巧](https://zhuanlan.zhihu.com/p/104412058)