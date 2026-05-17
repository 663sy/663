// 1. 用户的初始维度数据（从5分中位数开始）
// P:节奏效率, I:边界包容, W:福利平等, C:文化历史
let userProfile = { P: 5, I: 5, W: 5, C: 5 };
let historyStack = []; // 记录每次点击前的userProfile快照

// 城市基准数据库（包含全球20个核心都会的坐标与深度解析）
const cityMatrix = {
    tokyo: { 
        name: "东京 (Tokyo)", P: 9, I: 9, W: 4, C: 9, 
        img: "tok.jpg",
        desc: "【极致功能与原子化自由的亚洲巅峰】\n\n东京是一座将现代功能推向极致的超级都会。在这里，你能够获取全球最顶尖的文化资源，从独立艺术院线到巨星演唱会应有尽有。整座城市像一台精密咬合的钟表，轨道交通严丝合缝。\n\n它赋予了你绝对的“隐身权”，高度发达的边界感让你在人群中能够保有绝对的个人隐私，享受互不打扰的自由。这种建立在极度丰富和绝对规则之上的生活，完美契合了你对效率与顶级物质文化体验的向往。" 
    },
    singapore: { 
        name: "新加坡 (Singapore)", P: 8, I: 8, W: 7, C: 4,
        img: "sin.jpg",
        desc: "【严密法治与热带绿意交织的绝对安稳】\n\n新加坡为你提供了一个免于匮乏与失序的终极安全网。强大的社会托底体系与组屋制度，让普通人拥有安居乐业的极大底气。这座城市同时具备顶级的行政效率与严明透明的法治环境，一切运转都有迹可循。\n\n极高的绿化率与无缝衔接的现代基建，让你在热带海湾的微风中享受极其顺滑的日常。这里的包容建立在理性契约与互不侵犯的基础之上，为你带来极度安稳且高品质的生活。" 
    },
    taipei: { 
        name: "台北 (Taipei)", P: 5, I: 4, W: 7, C: 8, 
         img: "tai.jpg",
        desc: "【极高便利度与温润人情共生的松弛日常】\n\n台北在现代都会的骨架里，保留着最为温润平和的市井灵魂。这里拥有极其发达的捷运与YouBike网络，通勤毫无压迫感；24小时便利店与顶级艺文活动交织，生活效率极高。\n\n你可以选择不去追求世俗的巨大成功，依然能依靠完善的健保与平等的观念过得极有尊严。浓厚的人情味与深刻的历史沉淀在这里自然交融，为你提供了一种兼具高效率与深沉人文底色的从容人生。" 
    },
    amsterdam: {
        name: "阿姆斯特丹 (Amsterdam)", P: 4, I: 9, W: 9, C: 7, 
        img: "ams.jpg",
        desc: "【终极包容与严密法治共存的理想国】\n\n阿姆斯特丹完美实践了“为所欲为且勿伤害他人”的终极自由理念。在这座由运河与古老砖房编织的城市里，极度的社会包容度与极其严密的法治体系达成了绝妙的平衡。\n\n作为全球著名的骑行之都，你每天的通勤都会穿梭在绿意与水波之间，毫无压迫感。完善的福利体系消解了生存焦虑。你可以按照自己内心最真实的渴望去生活，毫无顾忌地拥抱多元文化，并在周末随时跳上火车，沉浸在欧洲大陆深厚的历史长河中。" 
    },
    melbourne: { 
        name: "墨尔本 (Melbourne)", P: 3, I: 5, W: 9, C: 6,
        img: "meb.jpg",
        desc: "【海湾阳光与极度体面生活底线的交汇】\n\n墨尔本代表着一种剥离了内卷焦虑的理想化生活样态。作为南半球的文化与艺术心脏，它拥有极其浓厚的独立音乐、咖啡文化与美术馆生态。\n\n完善的国家福利体系与极高的底薪保障，让每一个普通工薪族都能拥有极其体面的生活质感与漫长的休闲时光。你可以沿着宽阔的海湾肆意骑行，感受南半球明媚的阳光。这里的社会氛围既拥有边界感清晰的法治底线，又充满了移民城市特有的热情与松弛感。" 
    },
    london: { 
        name: "伦敦 (London)", P: 8, I: 8, W: 5, C: 10, 
        img: "lon.jpg",
        desc: "【全球文化主场与无限包容的精神温床】\n\n伦敦是世界文化艺术的绝对顶点。无数的剧院、常年不间断的顶级音乐节与顶尖艺术电影院，让你绝不会错过任何你想看、想买、想玩的东西。\n\n伦敦对各种边缘文化和小众爱好的包容度到了近乎纵容的地步，个人生活空间极少受到世俗眼光的审视。虽然通勤忙碌，但错落的有历史感的街区、星罗棋布的皇家公园和泰晤士河的水景，为追求精神世界的人提供了无穷的灵感源泉。" 
    },
    newyork: { 
        name: "纽约 (New York)", P: 10, I: 8, W: 2, C: 9, 
        img: "nyc.jpg",
        desc: "【资本主义竞技场与野心家的不夜城】\n\n纽约拥有全世界最密集的文化资源和最具侵略性的城市节奏。这里是全球商业与现代艺术的超级风暴中心，24小时不打烊的地铁和繁华街区释放着巨大的能量。\n\n然而，这里信奉纯粹的丛林法则。高昂的物价与薄弱的社会兜底意味着极高的生存压力。它不适合寻求安稳生活的人，但对于渴望在最激烈的竞争中证明自己、追求极致多元与物质碰撞的野心家来说，这里是无可替代的圣地。" 
    },
    paris: { 
        name: "巴黎 (Paris)", P: 6, I: 7, W: 8, C: 10, 
        img: "par.jpg",
        desc: "【活生的历史博物馆与浪漫主义的精神避难所】\n\n巴黎本身就是人类文明的巨大露天博物馆。每一块石砖、每一座建筑都沉淀着百年的故事。这里的独立院线和艺文沙龙密度冠绝全球，下班后在塞纳河畔散步或在左岸咖啡馆发呆，是普通市民随手可得的精神滋养。\n\n法国深厚的福利传统保障了劳动者的体面与假期。巴黎人有着强烈的个人边界，但他们的社区又充满了浓郁的市井烟火气和人情摩擦，绝不冷冽。" 
    },
    berlin: { 
        name: "柏林 (Berlin)", P: 5, I: 8, W: 8, C: 8, 
        img: "ber.jpg",
        desc: "【粗犷反叛的亚文化天堂与低成本自由之城】\n\n柏林是一座历经剧烈维新转型、带着独特历史伤痕的先锋都市。它是全球电子乐、街头涂鸦和先锋艺术的圣地。相比于欧洲其他首都，这里的生活成本和竞争压力相对较低，包容普通人选择更加非主流的生活方式。\n\n严明的法治与德国完善的社会兜底保障了你的日常运转，而粗糙、不修边幅的城市美学则赋予了这座城市极大的思想自由度。这是一个允许你尽情探索边界、不用向世俗成功妥协的避风港。" 
    },
    seoul: { 
        name: "首尔 (Seoul)", P: 9, I: 7, W: 3, C: 7, 
        img: "seo.jpg",
        desc: "【极速运转的潮流前线与高压社会时钟的交织】\n\n首尔是一座将现代高科技、流行文化与极速生活效率完美融合的时尚都会。数字化政务、极速外卖和无缝连接的公共交通让日常起居变得异常便利。这里有极具视觉冲击力的都市霓虹和丰富的深夜娱乐娱乐文化。\n\n但作为东亚内卷文化的代表之一，这里有着极其严密的社会时钟和高度慕强的评价体系，工薪阶层的阶层跃升和精神压力巨大。它能给你带来最前沿的物质享受，同时也需要你付出高强度的精力去适应它的节奏。" 
    },
    kyoto: { 
        name: "京都 (Kyoto)", P: 3, I: 9, W: 6, C: 10, 
        img: "kyo.jpg",
        desc: "【古老岁月的完美凝固与极致克制的东方美学】\n\n京都拥有无与伦比的古代历史沉淀与侘寂风的建筑肌理。在这里，漫长的历史不是博物馆里的展品，而是触手可及的日常生活。城市节奏缓慢，大片古迹与自然水系交融，散发着沉静的文化气场。\n\n需要注意的是，这里的便利度无法与一线都会相比，日常出行依赖自行车与公交。同时，京都维持着一种极致克制、相敬如宾但也相对排外的隐形人际边界。它适合那些内心极度丰盈、追求绝对安静与古典审美的隐士。" 
    },
    bangkok: { 
        name: "曼谷 (Bangkok)", P: 6, I: 3, W: 3, C: 8, 
        img: "mg.jpg",
        desc: "【市井烟火的大熔炉与热带松弛的野性自由】\n\n曼谷是一座包容度爆表、充满草根活力与异国风情的宗教古都会。这里的物价丰俭由人，极其庞大的夜市、街头小贩和热情外放的市民，让整座城市永远处于一种热气腾腾的世俗快乐之中。\n\n不过，这里的法治透明度与行政效率相对薄弱，严重的交通拥堵和雨季内涝是难以逃避的城市痛点。如果你看重严明的法治底线和顺畅的高效通勤，它可能会让你感到困扰；但如果你热爱无拘无束的市井温情，这里就是天堂。" 
    },
    vancouver: { 
        name: "温哥华 (Vancouver)", P: 4, I: 6, W: 9, C: 3,
        img: "van.jpg",
        desc: "【依山傍海的温润极乐与剥离焦虑的生态之城】\n\n温哥华拥有全北美最令人艳羡的自然尺度。太平洋的海湾直接嵌入城市内部，雄伟的雪山作为背景。冬季温和多雨，极少有严重的自然灾害。顺着海滨栈道骑行或散步，能获得极强的身体和视觉抚慰。\n\n作为高度成熟的福利社会，这里的节奏非常缓慢，职场氛围极其注重生活与工作的平衡，包容普通人无忧无虑地度过一生。它的现代商业和文化繁华度或许不如伦敦东京，但其无可挑剔的生态环境和高福利，提供了完美的安居环境。" 
    },
    sydney: { 
        name: "悉尼 (Sydney)", P: 6, I: 6, W: 8, C: 4,
        img: "syd.jpg",
        desc: "【阳光海岸的阳光都会与高品质生活的标本】\n\n悉尼将开阔的地形张力、壮丽的天然海湾与高效的现代都市基建完美地结合在了一起。这里气候宜人，充满活力的户外骑行文化与沙滩生活是每个市民日常的一部分。\n\n澳大利亚完善的医疗与薪资兜底保障了普通工薪阶层的体面生活。相比于墨尔本的文艺内敛，悉尼更加摩登、开放且充满商业活力。它既能满足你对高效率现代便利的要求，又不会剥夺你走向大自然拥抱松弛的权利。" 
    },
    hongkong: { 
        name: "香港 (Hong Kong)", P: 10, I: 7, W: 4, C: 6, 
        img: "hk.jpg",
        desc: "【高效网格的垂直都会与东西碰撞的传统余韵】\n\n香港是一座将空间利用和行政办事效率发挥到地理极限的紧凑型海港大都市。极其精密准时的地铁网络让你几乎感受不到通勤的摩擦。摩天大楼与古老的庙宇、陡峭的坡道在狭窄的空间内剧烈碰撞，视觉张力极强。\n\n这里崇尚绝对的商业效率与法治契约，但高昂的居住成本和狭小的生存空间给工薪阶层带来了极大的压迫感。它能极速响应你的任何物质与娱乐需求，同时也需要你习惯在高效、高密度的空间中生存。" 
    },
    reykjavik: { 
        name: "雷克雅未克 (Reykjavik)", P: 2, I: 7, W: 10, C: 4, 
        img: "rey.jpg",
        desc: "【世界边缘的冷酷仙境与极致平等的福利乌托邦】\n\n作为全球最北的首都，雷克雅未克是一座隐藏在火山、地热与极光之中的宁静小城。这里人口稀少，人际关系高度平等，犯罪率近乎为零。北欧极高水平的社会福利和对弱势群体的支持，让这里的人民拥有极高的幸福感与尊严。\n\n这里没有任何一线都会的拥挤和喧嚣，但也意味着你必须忍受漫长的冬夜和匮乏的超级娱乐演唱会资源。这是一个能让你彻底洗净世俗疲惫、在冰火交融的自然中获得绝对安全感的终极归宿。" 
    },
    copenhagen: { 
        name: "哥本哈根 (Copenhagen)", P: 4, I: 8, W: 10, C: 6, 
        img: "cop.jpg",
        desc: "【自行车上的幸福标本与极简法治的现代生活】\n\n哥本哈根是全球公认最幸福的城市之一。全城由错综复杂的水系和世界顶级的自行车网覆盖，人们极其安静整齐地排队，公共空间的设计充满了对人和流浪动物的尊重与善意。\n\n作为强福利国家，这里的职业观念极度平等，普通人也能享受极高的生活质感。社会治安极佳，深夜散步也无需担心。虽然气候偏冷，但室内温暖的 hygge 氛围和严明透明的社会规则，能让你体会到一种极具尊严、安全且高品质的现代市民生活。" 
    },
    vienna: { 
        name: "维也纳 (Vienna)", P: 4, I: 7, W: 9, C: 9, 
        img: "vie.jpg",
        desc: "【古典音乐的宏伟殿堂与工薪阶层的宜居神话】\n\n维也纳常年蝉联全球最宜居城市榜首，它最伟大的成就在于通过强大的政府公共预算，为工薪阶层提供了极高品质的保障性住房和极低的公共交通成本。普通人在这里不需要高收入，就能享受到宫殿般的城市美学。\n\n这里拥有极为深厚的古代帝国历史，古典音乐厅、歌剧院与宁静的图书馆遍布街头。社会运转高度法治、安全且井然有序，节奏不疾不徐。它完美地融合了欧洲最顶级的古典艺术底蕴与最具人文关怀的社会托底制度。" 
    },
    sanfrancisco: { 
        name: "旧金山 (San Francisco)", P: 8, I: 8, W: 4, C: 6, 
        img: "san.jpg",
        desc: "【海湾坡道的科技先锋与极度宽容的个人主义浪潮】\n\n旧金山是一座建在剧烈起伏坡道上的海湾名城，金门大桥在海雾中若隐若现，视觉景观极具戏剧性。作为全球科技创新的核心腹地之一，这里聚集了无数聪明的大脑，文化氛围极其推崇个人主义、自由反叛与多元平权。\n\n它对各类少数群体和前卫思想的民间包容度极高，走在街头能感受到强烈的自由气息。但由于缺乏强力的社会福利兜底，城市内部贫富差距巨大，高昂的物价和局部地区的治安问题是其明显的硬伤。它适合那些热爱科技、海湾风光和极致自由灵魂的人。" 
    },
    istanbul: { 
        name: "伊斯坦布尔 (Istanbul)", P: 7, I: 4, W: 3, C: 10, 
        img: "ist.jpg",
        desc: "【横跨欧亚的帝国史诗与博斯普鲁斯的海浪回响】\n\n伊斯坦布尔是人类古代历史的超级十字路口，拜占庭与奥斯曼帝国的宏伟穹顶与城墙在这里连绵千年。城市依傍着壮丽的博斯普鲁斯海峡，街道随地形剧烈起伏，街角随处可见被市民妥善照顾的流浪猫，充满了浓郁的市井温情。\n\n这座城市带着一种旧时代折衷主义的迷人审美。然而，不稳定的宏观经济、严重的通货膨胀以及地质上的地震隐患，使得作为长居选择时缺乏足够的制度安全感。但如果你愿意忍受它在法治和效率上的小瑕疵，它会用最壮丽的历史水景和人间烟火拥抱你。" 
    }
};


// 3. 题库配置 (这里先放2道题用于测试，格式已升级为 effects)
const questions = [
    {
        question: "1. 面对日常的城市通勤，你最看重哪一点？",
        options: [
            { text: "A. 极致准时的轨道交通，哪怕拥挤。", effects: { P: 2, W: -1 } },
            { text: "B. 友好的步行与骑行路权，沿途有绿植。", effects: { P: -2, W: 1 } },
            { text: "C. 道路宽阔，可以低成本呼叫网约车。", effects: { P: 1, I: 1 } },
            { text: "D. 在车上享受属于自己的独处时间。", effects: { I: 1, P: -1 } }
        ]
    },
    {
        question: "2. 办理政府文件或医疗预约时，你的容忍度是：",
        options: [
            { text: "A. 全数字化高效率，手机端5分钟搞定。", effects: { P: 2, I: 1 } },
            { text: "B. 线下网点服务极度周到，慢一点没关系。", effects: { P: -1, I: -1, W: 1 } },
            { text: "C. 规章透明，按照既定程序慢慢排队等待。", effects: { W: 2, P: -1 } },
            { text: "D. 倾向于宽松随意，带着点热带随性。", effects: { P: -2, W: -1 } }
        ]
    },
    {
        question: "3. 周末想看一场小众独立艺术电影，你希望这座城市的反应是：",
        options: [
            { text: "A. 毫不费力，市中心有顶尖艺术院线。", effects: { P: 1, C: 2 } },
            { text: "B. 愿意花一小时车程去城市边缘的艺术区。", effects: { P: -1, C: 1 } },
            { text: "C. 躺在家里用极速网络看流媒体。", effects: { I: 2, C: -1 } },
            { text: "D. 社区公园或广场的露天放映会。", effects: { I: -2, C: 1 } }
        ]
    },
    {
        question: "4. 假定你是普通工薪族，你对这座城市的生活期待是：",
        options: [
            { text: "A. 有跃升阶层机会，哪怕需要高强度努力。", effects: { P: 2, W: -2 } },
            { text: "B. 完善福利兜底，平庸也能极有尊严地度过一生。", effects: { P: -2, W: 3 } },
            { text: "C. 物价丰俭由人，所有人能找到生存空间。", effects: { W: 1, P: -1 } },
            { text: "D. 充满丛林法则，享受高风险高回报。", effects: { P: 2, W: -3 } }
        ]
    },
    {
        question: "5. 你理想中的邻居和社会人际关系是怎样的？",
        options: [
            { text: "A. 绝对的边界感，互不打扰，哪怕显得原子化。", effects: { I: 3 } },
            { text: "B. 保持礼貌距离，但社区带有温情和互助。", effects: { I: -1, W: 1 } },
            { text: "C. 充满烟火气，经常串门或一起吃大排档。", effects: { I: -3 } },
            { text: "D. 充满流动性，总有世界各地的陌生人萍水相逢。", effects: { I: 1, P: 1 } }
        ]
    },
    {
        question: "6. 下班后感到疲惫，你更倾向于去哪里恢复能量？",
        options: [
            { text: "A. 只有吧台的深夜独脚酒馆或黑胶唱片店。", effects: { I: 1, C: 1 } },
            { text: "B. 有大片绿地、流浪猫和长椅的安静社区公园。", effects: { P: -1, I: -1 } },
            { text: "C. 极具视觉张力的海湾栈道或山地观景台。", effects: { P: -2, C: -1 } },
            { text: "D. 充满鼎沸人声的夜市，淹没在白噪音中。", effects: { I: -2, P: 1 } }
        ]
    },
    {
        question: "7. 面对少数群体或非主流文化，你希望这座城市：",
        options: [
            { text: "A. 制定极度完善的平权法律，制度层面保护。", effects: { W: 2, I: 1 } },
            { text: "B. 民间自发包容，为所欲为但勿伤害即可。", effects: { I: 2, W: 1 } },
            { text: "C. 划定特定街区供其自由野蛮生长。", effects: { I: 1, W: -1 } },
            { text: "D. 保持传统秩序，主流价值观占据绝对导向。", effects: { W: -2, I: -1 } }
        ]
    },
    {
        question: "8. 当你在陌生的街头迷路，你更希望：",
        options: [
            { text: "A. 依赖精准的手机地图和极速网络。", effects: { P: 2, I: 1 } },
            { text: "B. 遇到愿意亲自带你走过几条街的热心市民。", effects: { I: -2, P: -1 } },
            { text: "C. 随处可见多语言的清晰路牌和游客中心。", effects: { P: 1, I: -1 } },
            { text: "D. 顺便迷失，把这当成探索古老肌理的体验。", effects: { P: -2, C: 2 } }
        ]
    },
    {
        question: "9. 推开卧室窗户，你最希望看到的城市景观是：",
        options: [
            { text: "A. 充满秩序和赛博感的摩天大楼与玻璃幕墙。", effects: { P: 2, C: -2 } },
            { text: "B. 高低起伏的坡道、错落的台阶与老派建筑。", effects: { C: 2, P: -1 } },
            { text: "C. 一望无际的平原与高效网格化街道。", effects: { P: 1, C: -1 } },
            { text: "D. 大量热带绿植，远处有清晰的海湾或河川。", effects: { P: -2, C: -1 } }
        ]
    },
    {
        question: "10. 当老旧历史街区遇到现代化改造，你倾向于：",
        options: [
            { text: "A. 彻底推倒重建为高效的现代商业综合体。", effects: { P: 2, C: -2 } },
            { text: "B. 保留古老外观，内部改造成顶尖智能设施。", effects: { P: 1, C: -1 } },
            { text: "C. 原汁原味保留历史，牺牲现代通车便利也值得。", effects: { P: -2, C: 2 } },
            { text: "D. 将历史元素作为新建超级建筑的景观点缀。", effects: { P: 1, C: 0 } }
        ]
    },
    {
        question: "11. 你对于“城市美学”的理解更偏向：",
        options: [
            { text: "A. 极简主义、未来感的钢筋水泥几何线条。", effects: { P: 2, C: -2 } },
            { text: "B. 经过岁月侵蚀、带有粗糙质感的古老巷弄。", effects: { C: 2, P: -1 } },
            { text: "C. 外来文化拼接碰撞、带有旧殖民色彩的街头。", effects: { C: 1, I: 1 } },
            { text: "D. 建筑隐藏在繁茂树冠与自然水系中的生态美学。", effects: { P: -2, C: -1 } }
        ]
    },
    {
        question: "12. 让你决定长期居住的最核心文化吸引力是：",
        options: [
            { text: "A. 顶级巡回演唱会、首发品牌和现代艺术大展。", effects: { P: 2, C: 1 } },
            { text: "B. 触手可及的古代遗迹、帝国博物馆与传统祭典。", effects: { C: 3, P: -1 } },
            { text: "C. 草根活力的街头涂鸦、地下音乐和亚文化浪潮。", effects: { I: 2, C: 1 } },
            { text: "D. 发达的学术氛围、公共图书馆与古典音乐厅。", effects: { I: 1, C: 2 } }
        ]
    },
    {
        question: "13. 走在深夜的街头，你对城市安全感的要求是：",
        options: [
            { text: "A. 严刑峻法与无死角监控，绝对的安全。", effects: { P: 1, W: 1, I: 1 } },
            { text: "B. 相对安全即可，保留原生张力不被过度管控。", effects: { W: -1, I: -1 } },
            { text: "C. 待在特定富裕街区，接受城市不同区域治安差异。", effects: { W: -2, I: 2 } },
            { text: "D. 只要自己警惕即可，享受略带危险的午夜自由。", effects: { W: -3, I: 1 } }
        ]
    },
    {
        question: "14. 面对城市的公共广场或草坪，你希望的氛围是：",
        options: [
            { text: "A. 管理严格，干净整洁，强调秩序不可喧哗。", effects: { P: 2, I: 1 } },
            { text: "B. 极度松弛，随时躺下野餐或自发进行街头演讲。", effects: { P: -2, W: 1 } },
            { text: "C. 划定清晰功能区，运动和静坐互不干扰。", effects: { I: 2, P: 1 } },
            { text: "D. 充满自发形成的小贩摊位和市井交易。", effects: { I: -2, P: -1 } }
        ]
    },
    {
        question: "15. 如果这座城市有一个拟人化的性格，你希望它是：",
        options: [
            { text: "A. 精密、高效、略带距离感且绝不出错的西装精英。", effects: { P: 3, I: 2 } },
            { text: "B. 温柔、包容、注重生活品质的咖啡馆主理人。", effects: { P: -2, W: 2 } },
            { text: "C. 热情、粗犷、不拘小节的街头艺术家。", effects: { I: -2, P: 1 } },
            { text: "D. 严肃、克制、底蕴深厚的老派学者。", effects: { C: 2, P: -1 } }
        ]
    },
    {
        question: "16. 你对于城市气候与自然环境的底线是：",
        options: [
            { text: "A. 常夏气候，免去寒冷困扰，无需厚冬装。", effects: { P: -1, C: -1 } },
            { text: "B. 绝对不能有频繁的严重自然灾害（如强震、积水）。", effects: { W: 2 } },
            { text: "C. 四季分明，能随季节欣赏樱花、红叶或雪景。", effects: { C: 1, P: 1 } },
            { text: "D. 能忍受恶劣天气或灾害，只要文化足够吸引我。", effects: { C: 2, W: -1 } }
        ]
    },
    {
        question: "17. 理想的周末逃离计划，希望能在半小时车程内抵达：",
        options: [
            { text: "A. 极具抚慰感的海湾、沙滩或广阔港口。", effects: { P: -2, C: -1 } },
            { text: "B. 厚重宗教色彩或幕府时代痕迹的古都遗址。", effects: { C: 3 } },
            { text: "C. 汇聚全球奢侈品牌和高级餐厅的商业中心。", effects: { P: 2, C: -1 } },
            { text: "D. 保留原始生态风貌、适合徒步的高山森林。", effects: { P: -2, I: 1 } }
        ]
    },
    {
        question: "18. 你认为一座城市最能体现顶级文明程度的细节是：",
        options: [
            { text: "A. 随处可见且极其干净的无障碍与母婴设施。", effects: { W: 2, P: 1 } },
            { text: "B. 密集的便利店与半夜极速送达的外卖系统。", effects: { P: 3, W: -1 } },
            { text: "C. 高峰期人们在阶梯上极度安静整齐的排队秩序。", effects: { I: 2, P: 1 } },
            { text: "D. 对流浪动物的妥善安置及对弱势群体的宽容。", effects: { W: 3 } }
        ]
    },
    {
        question: "19. 假设你掌握城市预算，最希望增加哪项开支？",
        options: [
            { text: "A. 建设通往周边城市的极速高铁和地下轨道网。", effects: { P: 2 } },
            { text: "B. 补贴独立书店、艺术院线及小微文化创业者。", effects: { C: 2, W: 1 } },
            { text: "C. 扩建大面积的城市绿肺公园和滨水骑行步道。", effects: { P: -2, W: 1 } },
            { text: "D. 提升基层公务员效率，大规模升级电子政务。", effects: { P: 2, W: 1 } }
        ]
    },
    {
        question: "20. 最终，当你老去时，希望这座城市留给你的回忆是：",
        options: [
            { text: "A. 见证了亚洲甚至世界最前沿的商业浪潮与物质极盛。", effects: { P: 2, W: -1 } },
            { text: "B. 获得了一生未受打扰的“平庸的自由”，极有尊严。", effects: { W: 3, P: -1 } },
            { text: "C. 与充满温情的邻里、老街和烟火气融为一体。", effects: { I: -3, P: -1 } },
            { text: "D. 静静凝视人类漫长的历史刻痕，获得内心绝对平静。", effects: { C: 3, P: -2 } }
        ]
    }
];


// 4. 全局状态控制
let currentQuestionIndex = 0;
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const progressBarEl = document.getElementById('progress-bar');
const questionScreenEl = document.getElementById('question-screen');
const resultScreenEl = document.getElementById('result-screen');

// 5. 渲染题目
function renderQuestion() {
    questionScreenEl.classList.remove('fade-in');
void questionScreenEl.offsetWidth;
questionScreenEl.classList.add('fade-in');
    const currentQ = questions[currentQuestionIndex];
    questionTextEl.textContent = currentQ.question;
    optionsContainerEl.innerHTML = '';

    currentQ.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        
        // 绑定点击事件，传入选项的 effects 数据
        button.addEventListener('click', () => handleOptionClick(option.effects));
        
        optionsContainerEl.appendChild(button);
    });
    if (currentQuestionIndex > 0) {
    const backBtn = document.createElement('button');
    backBtn.className = 'option-btn';
    backBtn.textContent = '← 返回上一题';
    backBtn.style.background = '#f0f0f0';
    backBtn.style.color = '#888';
    backBtn.addEventListener('click', goBack);
    optionsContainerEl.appendChild(backBtn);
}

    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBarEl.setAttribute('width', `${progressPercent}%`);
}

// 6. 处理点击事件与计分 (通过特效改变用户向量)
function handleOptionClick(effects) {
    if (effects) {
        historyStack.push({...userProfile});
        for (const dimension in effects) {
            userProfile[dimension] += effects[dimension];
            // 限制分数在 1 到 10 之间，防止极端溢出
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}
function goBack() {
    if (currentQuestionIndex === 0 || historyStack.length === 0) return;
    currentQuestionIndex--;
    userProfile = historyStack.pop();
    renderQuestion();
}

// 7. 终极计算核心：计算匹配度、排名并输出雷达图
function showResult() {
    // 最终边界保护，只做一次
for (const dim in userProfile) {
    userProfile[dim] = Math.max(1, Math.min(10, userProfile[dim]));
}
    questionScreenEl.classList.add('hidden');
    resultScreenEl.classList.remove('hidden');
    progressBarEl.setAttribute('width', '100%');

    // 用于存放所有城市的距离和得分
    let resultsArray = [];
    
    // 我们四维空间（每维1-10分）里的理论最大距离是 18 
    // 根号下 (9的平方 + 9的平方 + 9的平方 + 9的平方) = 18
    const MAX_DISTANCE = 18; 

    // 遍历计算每一个城市
    for (const cityKey in cityMatrix) {
        const city = cityMatrix[cityKey];
        
        let distance = Math.sqrt(
            Math.pow(userProfile.P - city.P, 2) +
            Math.pow(userProfile.I - city.I, 2) +
            Math.pow(userProfile.W - city.W, 2) +
            Math.pow(userProfile.C - city.C, 2)
        );

        // 将几何距离换算成 0% - 100% 的百分比匹配度
        let matchPercentage = Math.round((1 - distance / MAX_DISTANCE) * 100);
        
        resultsArray.push({
            id: cityKey,
            name: city.name,
            desc: city.desc,
            match: matchPercentage
        });
    }

    // 按照匹配度从高到低对数组进行排序
    resultsArray.sort((a, b) => b.match - a.match);

    // 提取第一名（命中注定的城市）
    const topCity = resultsArray[0];

    // --- 开始渲染文字到页面 ---
    
    // 1. 渲染主城市
    const cityImg = document.createElement('img');
cityImg.src = topCity.img;
cityImg.style.cssText = 'width:100%; height:200px; object-fit:cover; border-radius:12px; margin-bottom:20px;';
document.getElementById('result-screen').insertBefore(cityImg, document.getElementById('result-city-name'));
    document.getElementById('result-city-name').textContent = `${topCity.name} (匹配度：${topCity.match}%)`;
    document.getElementById('result-description').textContent = topCity.desc;

    // 2. 动态创建一个区域，显示 Top 2 和 Top 3
    let extrasHtml = `
    <h3 style="margin-top:30px; color:#1d1d1f; font-size:0.95rem; font-weight:600; letter-spacing:-0.01em; border-top:1px solid #e5e5ea; padding-top:20px; margin-bottom:12px;">
        备选城市
    </h3>
    <div style="display:flex; gap:10px; margin-bottom:20px;">
        <div style="flex:1; border:1px solid #e5e5ea; border-radius:12px; overflow:hidden;">
            <img src="${resultsArray[1].img}" style="width:100%; height:90px; object-fit:cover; display:block;">
            <div style="padding:10px 12px;">
                <div style="font-size:0.8rem; color:#6e6e73; margin-bottom:2px;">🥈 第二匹配</div>
                <div style="font-size:0.9rem; font-weight:600; color:#1d1d1f; letter-spacing:-0.01em;">${resultsArray[1].name}</div>
                <div style="font-size:0.85rem; color:#6e6e73; margin-top:4px;">${resultsArray[1].match}% 匹配</div>
            </div>
        </div>
        <div style="flex:1; border:1px solid #e5e5ea; border-radius:12px; overflow:hidden;">
            <img src="${resultsArray[2].img}" style="width:100%; height:90px; object-fit:cover; display:block;">
            <div style="padding:10px 12px;">
                <div style="font-size:0.8rem; color:#6e6e73; margin-bottom:2px;">🥉 第三匹配</div>
                <div style="font-size:0.9rem; font-weight:600; color:#1d1d1f; letter-spacing:-0.01em;">${resultsArray[2].name}</div>
                <div style="font-size:0.85rem; color:#6e6e73; margin-top:4px;">${resultsArray[2].match}% 匹配</div>
            </div>
        </div>
    </div>
`;

    // 3. 动态创建个人雷达数据面板
    extrasHtml += `
        <h3 style="margin-top: 30px; color: #666; border-top: 1px solid #ddd; padding-top: 15px;">
            你的专属城市性格画像：
        </h3>
        <ul style="color: #444; line-height: 1.8; padding-left: 20px;">
            <li>🏃 节奏与效率追求：<b>${userProfile.P} / 10</b> (分数越高越渴望高效摩登)</li>
            <li>🛡️ 社交边界与原子化：<b>${userProfile.I} / 10</b> (分数越高越需要私人空间)</li>
            <li>🤝 社会福利与平等：<b>${userProfile.W} / 10</b> (分数越高越看重安全感与兜底)</li>
            <li>🏛️ 历史与人文沉淀：<b>${userProfile.C} / 10</b> (分数越高越向往深厚底蕴)</li>
        </ul>
    `;

    // 将这些新内容追加到结果页的描述下方
    const extraDiv = document.createElement('div');
    extraDiv.innerHTML = extrasHtml;
    document.getElementById('result-screen').insertBefore(extraDiv, document.querySelector('#result-screen button'));
    
}


// 初始化，开始运行测试
renderQuestion();
