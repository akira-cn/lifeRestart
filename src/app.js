import { summary } from './functions/summary.js';
import { getGrade } from './functions/addition.js';
import { specialthanks } from './data/specialthanks.js';
import Life from './life.js';

class App{
    constructor(){
        this.#life = new Life();
    }

    #life;
    #pages;
    #currentPage;
    #talentSelected = new Set();
    #totalMax=20;
    #isEnd = false;
    #selectedExtendTalent = null;
    #hintTimeout;
    #specialthanks;

    async initial() {
        this.initPages();
        this.switch('loading');
        await this.#life.initial();
        this.#specialthanks = specialthanks;
        this.switch('index');
        globalThis.onerror = (event, source, lineno, colno, error) => {
            this.hint(`[ERROR] at (${source}:${lineno}:${colno})\n\n${error?.stack||error||'unknow Error'}`, 'error');
        }
        const keyDownCallback = (keyboardEvent) => {
            if (keyboardEvent.which === 13 || keyboardEvent.keyCode === 13) {
                const pressEnterFunc = this.#pages[this.#currentPage]?.pressEnter;
                pressEnterFunc && typeof pressEnterFunc === 'function' && pressEnterFunc();
            }
        }
        globalThis.removeEventListener('keydown', keyDownCallback);
        globalThis.addEventListener('keydown', keyDownCallback);
    }

    initPages() {

        // Loading
        const loadingPage = $(`
        <div id="main">
            <div id="title">
                码农搬砖模拟器<br>
                <div style="font-size:1.5rem; font-weight:normal;">加载中...</div>
            </div>
        </div>
        `);

        // Index
        const indexPage = $(`
        <div id="main">
            <button id="achievement">成就</button>
            <button id="specialthanks">特别感谢</button>
            <button id="themeToggleBtn">黑</button>
            <div id="title">
                码农搬砖模拟器<br>
                <div style="font-size:1.5rem; font-weight:normal;">如果不是家里穷，我也不想当码农</div>
            </div>
            <button id="restart" class="mainbtn"><span class="iconfont">&#xe6a7;</span>立即重开</button>
            <a id="discord" href="https://juejin.cn/pin/club/6824710202873348104" style="z-index: 9999;" aria-label="Chat on Discord"><button class="discord-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" viewBox="0 0 94.011 74.831">
            <g transform="scale(0.9,0.9) translate(-297.913 -2489.466)">
              <path d="M344.918,2535.954l0,0h0l29.2-23.04-7.917-6.357-21.283,16.793,0,0-.009.007-21.278-16.788-7.915,6.359,29.194,23.033Z" fill="#fff"/>
              <path d="M344.913,2507.564l.005,0,11.313-9-11.313-9.083-.015-.012-11.3,9.076,11.3,9.014Z" fill="#fff"/>
              <path d="M344.918,2551.693h0l-.012.01-39.078-30.833-7.915,6.358.761.6,46.244,36.468h0l29.223-23.056,17.782-14.03-7.917-6.357Z" fill="#fff"/>
            </g>
            </svg>
            CHAT</button><style>.discord-btn {position: fixed;bottom: 0.5rem;left: 0.5rem;background-color: #5865F2;padding: 0.7rem;height: auto;color: white;text-align: right;vertical-align: middle;border: none;width: 6.5rem;font-size: 1rem;border-radius: 4px;}.discord-btn svg {height: 1.5rem;position: absolute;top: 50%;left: 0;transform: translateY(-50%);}.discord-btn:hover svg{animation:discord-wave 560ms ease-in-out;}@keyframes discord-wave{0%,100%{transform:translateY(-50%) rotate(0)}20%,60%{transform:translateY(-50%) rotate(-25deg)}40%,80%{transform:translateY(-50%) rotate(10deg)}}@media (max-width:500px){.discord-btn:hover svg{animation:none}.discord-btn svg{animation:discord-wave 560ms ease-in-out}}</style></a>
        </div>
        `);

        // Init theme
        this.setTheme(localStorage.getItem('theme'))

        indexPage
            .find('#restart')
            .click(()=>this.switch('talent'));

        indexPage
            .find('#achievement')
            .click(()=>this.switch('achievement'));

        if(localStorage.getItem('theme') == 'light') {
            indexPage.find('#themeToggleBtn').text('黑')
        } else{
            indexPage.find('#themeToggleBtn').text('白')
        }

        indexPage
            .find("#themeToggleBtn")
            .click(() => {
                if(localStorage.getItem('theme') == 'light') {
                    localStorage.setItem('theme', 'dark');
                    indexPage.find('#themeToggleBtn').text('白')
                } else {
                    localStorage.setItem('theme', 'light');
                    indexPage.find('#themeToggleBtn').text('黑')
                }

                this.setTheme(localStorage.getItem('theme'))
            });

        indexPage
            .find('#specialthanks')
            .click(()=>this.switch('specialthanks'));

        const specialThanksPage = $(`
        <div id="main">
            <button id="specialthanks">返回</button>
            <div id="spthx">
                <ul class="g1"></ul>
                <ul class="g2"></ul>
            </div>
            <button class="sponsor" onclick="globalThis.open('https://afdian.net/@LifeRestart')" style="background: linear-gradient(90deg,#946ce6,#7e5fd9); left:auto; right:50%; transform: translate(-2rem,-50%);">打赏策划(爱发电)</button>
            <button class="sponsor" onclick="globalThis.open('https://dun.mianbaoduo.com/@vickscarlet')" style="background-color:#c69; left:50%; right:auto; transform: translate(2rem,-50%);">打赏程序(顿顿饭)</button>
        </div>
        `);

        specialThanksPage
            .find('#specialthanks')
            .click(()=>this.switch('index'));

        const achievementPage = $(`
        <div id="main">
            <button id="specialthanks">返回</button>
            <span class="title">统计</span>
            <ul id="total"></ul>
            <span style="padding:0.25rem; margin: 0.5rem 0; border: none; background: #ccc;"></span>
            <span class="title">成就</span>
            <ul id="achievements"></ul>
        `)

        achievementPage
            .find('#specialthanks')
            .click(()=>this.switch('index'));

        // Talent
        const talentPage = $(`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">天赋抽卡</div>
            <button id="random" class="mainbtn" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"">10连抽！</button>
            <ul id="talents" class="selectlist"></ul>
            <button id="next" class="mainbtn">请选择3个</button>
        </div>
        `);

        const createTalent = ({ grade, name, description }) => {
            return $(`<li class="grade${grade}b">${name}（${description}）</li>`)
        };

        talentPage
            .find('#random')
            .click(()=>{
                talentPage.find('#random').hide();
                const ul = talentPage.find('#talents');
                this.#life.talentRandom()
                    .forEach(talent=>{
                        const li = createTalent(talent);
                        ul.append(li);
                        li.click(()=>{
                            if(li.hasClass('selected')) {
                                li.removeClass('selected')
                                this.#talentSelected.delete(talent);
                                if(this.#talentSelected.size<3) {
                                    talentPage.find('#next').text('请选择3个')
                                }
                            } else {
                                if(this.#talentSelected.size==3) {
                                    this.hint('只能选3个天赋');
                                    return;
                                }

                                const exclusive = this.#life.exclusive(
                                    Array.from(this.#talentSelected).map(({id})=>id),
                                    talent.id
                                );
                                if(exclusive != null) {
                                    for(const { name, id } of this.#talentSelected) {
                                        if(id == exclusive) {
                                            this.hint(`与已选择的天赋【${name}】冲突`);
                                            return;
                                        }
                                    }
                                    return;
                                }
                                li.addClass('selected');
                                this.#talentSelected.add(talent);
                                if(this.#talentSelected.size==3) {
                                    talentPage.find('#next').text('开启搬砖人生')
                                }
                            }
                        });
                    });
                talentPage.find('#next').show()
            });

        talentPage
            .find('#next')
            .click(()=>{
                if(this.#talentSelected.size!=3) {
                    this.hint('请选择3个天赋');
                    return;
                }
                talentPage.find('#next').hide()
                this.#totalMax = 20 + this.#life.getTalentAllocationAddition(Array.from(this.#talentSelected).map(({id})=>id));
                this.switch('property');
            })

        // Property
        // hint of extension tobermory.es6-string-html
        const propertyPage = $(/*html*/`
        <div id="main">
            <div class="head" style="font-size: 1.6rem">
                <div>调整初始属性</div>
                <div id="total" style="font-size:1rem; font-weight:normal;">可用属性点：0</div>
            </div>
            <ul id="propertyAllocation" class="propinitial"></ul>
            <ul class="selectlist" id="talentSelectedView"></ul>
            <div class="btn-area">
                <button id="random" class="mainbtn">随机分配</button>
                <button id="start" class="mainbtn">开始新人生</button>
            </div>
        </div>
        `);
        propertyPage.mounted = ()=>{
            propertyPage
            .find('#talentSelectedView').append(
                `<li>已选天赋</li>` +
                Array.from(this.#talentSelected)
                .map(({name,description})=>`<li class="grade0b">${name}(${description})</li>`)
                .join('')
            )
        }
        const groups = {};
        const total = ()=>{
            let t = 0;
            for(const type in groups)
                t += groups[type].get();
            return t;
        }
        const freshTotal = ()=>{
            propertyPage.find('#total').text(`可用属性点：${this.#totalMax - total()}`);
        }
        const getBtnGroups = (name, min, max)=>{
            const group = $(`<li>${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>`);
            const btnSub = $(`<span class="iconfont propbtn">&#xe6a5;</span>`);
            const inputBox = $(`<input value="0">`);
            const btnAdd = $(`<span class="iconfont propbtn">&#xe6a6;</span>`);
            group.append(btnSub);
            group.append(inputBox);
            group.append(btnAdd);

            const limit = v=>{
                v = Number(v)||0;
                v = Math.round(v);
                return v < min ? min : (
                    v > max ? max : v
                )
            }
            const get = ()=>Number(inputBox.val());
            const set = v=>{
                inputBox.val(limit(v));
                freshTotal();
            }
            btnAdd.click(()=>{
                if(total() >= this.#totalMax) {
                    this.hint('没有可分配的点数了');
                    return;
                }
                set(get()+1);
            });
            btnSub.click(()=>set(get()-1));
            inputBox.on('input', ()=>{
                const t = total();
                let val = get();
                if(t > this.#totalMax) {
                    val -= t - this.#totalMax;
                }
                val = limit(val);
                if(val != inputBox.val()) {
                    set(val);
                }
                freshTotal();
            });
            return {group, get, set};
        }

        groups.CHR = getBtnGroups("颜值", 0, 10); // 颜值 charm CHR
        groups.INT = getBtnGroups("智商", 0, 10); // 智力 intelligence INT
        groups.STR = getBtnGroups("健康", 0, 10); // 体质 strength STR
        groups.SPR = getBtnGroups("心态", 0, 10); // 心态

        const ul = propertyPage.find('#propertyAllocation');

        for(const type in groups) {
            ul.append(groups[type].group);
        }

        propertyPage
            .find('#random')
            .click(()=>{
                let t = this.#totalMax;
                const arr = [10, 10, 10, 10];
                while(t>0) {
                    const sub = Math.round(Math.random() * (Math.min(t, 10) - 1)) + 1;
                    while(true) {
                        const select = Math.floor(Math.random() * 4) % 4;
                        if(arr[select] - sub <0) continue;
                        arr[select] -= sub;
                        t -= sub;
                        break;
                    }
                }
                groups.CHR.set(10 - arr[0]);
                groups.INT.set(10 - arr[1]);
                groups.STR.set(10 - arr[2]);
                groups.SPR.set(10 - arr[3]);
            });

        propertyPage
            .find('#start')
            .click(()=>{
                if(total() < this.#totalMax) {
                    this.hint(`你还有${this.#totalMax-total()}属性点没有分配完`);
                    return;
                } else if (total() > this.#totalMax) {
                    this.hint(`你多使用了${total() - this.#totalMax}属性点`);
                    return;
                }
                this.#life.restart({
                    CHR: groups.CHR.get(),
                    INT: groups.INT.get(),
                    STR: groups.STR.get(),
                    MNY: 0,
                    SPR: groups.SPR.get(),
                    TLT: Array.from(this.#talentSelected).map(({id})=>id),
                });
                this.switch('trajectory');
                this.#pages.trajectory.born();
                // $(document).keydown(function(event){
                //     if(event.which == 32 || event.which == 13){
                //         $('#lifeTrajectory').click();
                //     }
                // })
            });

        // Trajectory
        const trajectoryPage = $(`
        <div id="main">
            <ul id="lifeProperty" class="lifeProperty"></ul>
            <ul id="lifeTrajectory" class="lifeTrajectory"></ul>
            <div class="btn-area">
                <button id="summary" class="mainbtn">人生总结</button>
                <button id="domToImage" class="mainbtn">人生回放</button>
            </div>
            <div class="domToImage2wx">
                <img src="" id="endImage" />
            </div>
        </div>
        `);

        trajectoryPage
            .find('#lifeTrajectory')
            .click(()=>{
                if(this.#isEnd) return;
                const trajectory = this.#life.next();
                const { age, content, isEnd } = trajectory;
                const li = $(`<li><span>${age}个月：</span><span>${
                    content.map(
                        ({type, description, grade, name, postEvent}) => {
                            switch(type) {
                                case 'TLT':
                                    return `天赋【${name}】发动：${description}`;
                                case 'EVT':
                                    return description + (postEvent?`<br>${postEvent}`:'');
                            }
                        }
                    ).join('<br>')
                }</span></li>`);
                li.appendTo('#lifeTrajectory');
                $("#lifeTrajectory").scrollTop($("#lifeTrajectory")[0].scrollHeight);
                if(isEnd) {
                    $(document).unbind("keydown");
                    this.#isEnd = true;
                    trajectoryPage.find('#summary').show();
                    // trajectoryPage.find('#domToImage').show();
                } else {
                    // 如未死亡，更新数值
                    // Update properties if not die yet
                    const property = this.#life.getLastRecord();
                    $("#lifeProperty").html(`
                    <li><span>颜值</span><span>${property.CHR}</span></li>
                    <li><span>智商</span><span>${property.INT}</span></li>
                    <li><span>健康</span><span>${property.STR}</span></li>
                    <li><span>收入</span><span>${property.MNY}</span></li>
                    <li><span>心态</span><span>${property.SPR}</span></li>
                    `);
                }
            });
        // html2canvas
        trajectoryPage
            .find('#domToImage')
            .click(()=>{
                $("#lifeTrajectory").addClass("deleteFixed");
                const ua = navigator.userAgent.toLowerCase();
                domtoimage.toJpeg(document.getElementById('lifeTrajectory'))
                    .then(function (dataUrl) {
                        let link = document.createElement('a');
                        link.download = '我的人生回放.jpeg';
                        link.href = dataUrl;
                        link.click();
                        $("#lifeTrajectory").removeClass("deleteFixed");
                        // 微信内置浏览器，显示图片，需要用户单独保存
                        if(ua.match(/MicroMessenger/i)=="micromessenger") {
                            $('#endImage').attr('src', dataUrl);
                        }

                    });
            })
            .hide();

        trajectoryPage
            .find('#summary')
            .click(()=>{
                this.switch('summary');
            });

        // Summary
        const summaryPage = $(`
        <div id="main">
            <div class="head">人生总结</div>
            <ul id="judge" class="judge">
                <li class="grade2"><span>颜值：</span><span>9级 美若天仙</span></li>
                <li class="grade0"><span>智商：</span><span>4级 智力一般</span></li>
                <li class="grade0"><span>健康：</span><span>1级 极度虚弱</span></li>
                <li class="grade0"><span>收入：</span><span>6级 小康之家</span></li>
                <li class="grade0"><span>司龄：</span><span>3岁 早夭</span></li>
                <li class="grade0"><span>心态：</span><span></span>3级 不太幸福的人生</li>
            </ul>
            <div class="head" style="height:auto;">天赋，你可以选一个，下辈子还能抽到</div>
            <ul id="talents" class="selectlist" style="flex: 0 1 auto;">
                <li class="grade2b">黑幕（面试一定成功）</li>
            </ul>
            <button id="again" class="mainbtn"><span class="iconfont">&#xe6a7;</span>再次重开</button>
        </div>
        `);

        summaryPage
            .find('#again')
            .click(()=>{
                this.times ++;
                this.#life.talentExtend(this.#selectedExtendTalent);
                this.#selectedExtendTalent = null;
                this.#talentSelected.clear();
                this.#totalMax = 20;
                this.#isEnd = false;
                this.switch('index');
            });

        this.#pages = {
            loading: {
                page: loadingPage,
                clear: ()=>{
                    this.#currentPage = 'loading';
                },
            },
            index: {
                page: indexPage,
                btnAchievement: indexPage.find('#achievement'),
                btnRestart: indexPage.find('#restart'),
                hint: indexPage.find('.hint'),
                pressEnter: ()=>{
                    this.#pages.index.btnRestart.click();
                },
                clear: ()=>{
                    this.#currentPage = 'index';
                    indexPage.find('.hint').hide();

                    const times = this.times;
                    const achievement = indexPage.find('#achievement');
                    const discord = indexPage.find('#discord');
                    const specialthanks = indexPage.find('#specialthanks');

                    if(times > 0) {
                        achievement.show();
                        discord.show();
                        specialthanks.show();
                        return;
                    }

                    achievement.hide();
                    discord.hide();
                    specialthanks.hide();
                },
            },
            specialthanks: {
                page: specialThanksPage,
                clear: () => {
                    const groups = [
                        specialThanksPage.find('#spthx > ul.g1'),
                        specialThanksPage.find('#spthx > ul.g2'),
                    ];
                    groups.forEach(g=>g.empty());
                    this.#specialthanks
                        .sort(()=>0.5-Math.random())
                        .forEach(({group, name, comment, color})=>groups[--group].append(`
                            <li>
                                <span class="name" ${color?('style="color:'+color+'"'):''}>${name}</span>
                                <span class="comment">${comment||''}</span>
                            </li>
                        `))
                }
            },
            achievement: {
                page: achievementPage,
                clear: () => {
                    const total = achievementPage.find("ul#total");
                    const achievements = achievementPage.find("ul#achievements");
                    total.empty();
                    achievements.empty();

                    `<li><span class="achievementtitle">重开次数</span>紫色几率翻倍</li>`

                    const { times, achievement, talentRate, eventRate } = this.#life.getTotal();
                    total.append(`
                        <li class="achvg${getGrade('times', times)}"><span class="achievementtitle">已重开${times}次</span>抽到紫色几率不变</li>
                        <li class="achvg${getGrade('achievement', achievement)}"><span class="achievementtitle">成就达成${achievement}个</span>抽到橙色几率翻倍</li>
                        <li class="achvg${getGrade('talentRate', talentRate)}"><span class="achievementtitle">事件收集率</span>${Math.floor(talentRate * 100)}%</li>
                        <li class="achvg${getGrade('eventRate', eventRate)}"><span class="achievementtitle">天赋选择率</span>${Math.floor(eventRate * 100)}%</li>
                    `);

                    const achievementsData = this.#life.getAchievements();
                    achievementsData.forEach(({
                        name, description, hide,
                        grade, isAchieved
                    })=>{
                        if(hide && !isAchieved) name = description = '???';
                        achievements.append(
                            `<li class="achvg${grade} ${isAchieved?'':'mask'}"><span class="achievementtitle">${name}</span>${description}</li>`
                        );
                    })

                }
            },
            talent: {
                page: talentPage,
                talentList: talentPage.find('#talents'),
                btnRandom: talentPage.find('#random'),
                btnNext: talentPage.find('#next'),
                pressEnter: ()=>{
                    const talentList = this.#pages.talent.talentList;
                    const btnRandom = this.#pages.talent.btnRandom;
                    const btnNext = this.#pages.talent.btnNext;
                    if (talentList.children().length) {
                        btnNext.click();
                    } else {
                        btnRandom.click();
                    }
                },
                clear: ()=>{
                    this.#currentPage = 'talent';
                    talentPage.find('ul.selectlist').empty();
                    talentPage.find('#random').show();
                    this.#totalMax = 20;
                },
            },
            property: {
                page: propertyPage,
                btnStart: propertyPage.find('#start'),
                pressEnter: ()=>{
                    this.#pages.property.btnStart.click();
                },
                clear: ()=>{
                    this.#currentPage = 'property';
                    freshTotal();
                    propertyPage
                        .find('#talentSelectedView')
                        .empty();
                },
            },
            trajectory: {
                page: trajectoryPage,
                lifeTrajectory: trajectoryPage.find('#lifeTrajectory'),
                pressEnter: ()=>{
                    this.#pages.trajectory.lifeTrajectory.click();
                },
                clear: ()=>{
                    this.#currentPage = 'trajectory';
                    trajectoryPage.find('#lifeTrajectory').empty();
                    trajectoryPage.find('#summary').hide();
                    this.#isEnd = false;
                },
                born: ()=>{
                    trajectoryPage.find('#lifeTrajectory').trigger("click");
                }
            },
            summary: {
                page: summaryPage,
                clear: ()=>{
                    this.#currentPage = 'summary';
                    const judge = summaryPage.find('#judge');
                    const talents = summaryPage.find('#talents');
                    judge.empty();
                    talents.empty();
                    this.#talentSelected.forEach(talent=>{
                        const li = createTalent(talent);
                        talents.append(li);
                        li.click(()=>{
                            if(li.hasClass('selected')) {
                                this.#selectedExtendTalent = null;
                                li.removeClass('selected');
                            } else if(this.#selectedExtendTalent != null) {
                                this.hint('只能继承一个天赋');
                                return;
                            } else {
                                this.#selectedExtendTalent = talent.id;
                                li.addClass('selected');
                            }
                        });
                    });

                    const summaryData = this.#life.getSummary();
                    const format = (discription, type)=>{
                        const value = summaryData[type];
                        const { judge, grade } = summary(type, value);
                        return `<li class="grade${grade}"><span>${discription}：</span><span>${value} ${judge}</span></li>`;
                    };

                    judge.append(`
                        ${format('颜值', 'CHR')}
                        ${format('智力', 'INT')}
                        ${format('体质', 'STR')}
                        ${format('收入', 'MNY')}
                        ${format('心态', 'SPR')}
                        ${format('工龄', 'AGE')}
                        ${format('总评', 'SUM')}
                    `);
                }
            },
        }

        $$on('achievement', ({name})=>{
            this.hint(`解锁成就【${name}】`, 'success');
        })
    }

    switch(page) {
        const p = this.#pages[page];
        if(!p) return;
        $('#main').detach();
        p.clear();
        p.page.appendTo('body');
        if(typeof p.page.mounted === 'function'){
            p.page.mounted()
        }
    }

    hint(message, type='info') {
        if(this.#hintTimeout) {
            clearTimeout(this.#hintTimeout);
            this.#hintTimeout = null;
        }
        hideBanners();
        requestAnimationFrame(() => {
            const banner = $(`.banner.${type}`);
            banner.addClass('visible');
            banner.find('.banner-message').text(message);
            if(type != 'error') {
                this.#hintTimeout = setTimeout(hideBanners, 3000);
            }
        });
    }

    setTheme(theme) {
        const themeLink = $(document).find('#themeLink');

        if(theme == 'light') {
            themeLink.attr('href', 'light.css');
        } else {
            themeLink.attr('href', 'dark.css');
        }
    }

    get times() {return this.#life?.times || 0;}
    set times(v) { if(this.#life) this.#life.times = v };

}

export default App;
