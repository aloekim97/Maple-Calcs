(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_9cc86bc5._.js", {

"[project]/src/app/formulas/sf/itemstats.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>itemStats)
});
function itemStats(start, end, equipLevel) {
    const post15 = {
        130: {
            stat: 7,
            att: 7
        },
        140: {
            stat: 9,
            att: 8
        },
        150: {
            stat: 11,
            att: 9
        },
        160: {
            stat: 13,
            att: 10
        },
        200: {
            stat: 15,
            att: 12
        },
        250: {
            stat: 17,
            att: 14
        }
    };
    const { stat: baseStat, att: baseAtt } = post15[equipLevel] || {
        stat: 0,
        att: 0
    };
    const calculateStatsUpTo = (targetStar)=>{
        let currentStat = 0;
        let currentAtt = 0;
        let attIncrement = baseAtt;
        for(let star = 0; star < targetStar; star++){
            if (star < 5) {
                currentStat += 2;
            } else if (star < 15) {
                currentStat += 3;
            } else if (star < 20) {
                currentStat += baseStat;
                currentAtt += attIncrement;
                attIncrement += 1;
            } else if (star === 21) {
                currentStat += baseStat;
                currentAtt += attIncrement;
            } else if (star < 30) {
                currentAtt += attIncrement;
                attIncrement += 2;
            }
        }
        return {
            stat: currentStat,
            att: currentAtt
        };
    };
    const currentStats = calculateStatsUpTo(start);
    const additionalStats = calculateStatsUpTo(end);
    const finalStats = {
        stat: additionalStats.stat,
        att: additionalStats.att
    };
    const difference = {
        stat: additionalStats.stat - currentStats.stat,
        att: additionalStats.att - currentStats.att
    };
    return {
        finalStats,
        difference
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/sf/chance.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getChance": (()=>getChance)
});
function getChance(star) {
    const successChances = {
        0: 95,
        1: 90,
        2: 85,
        3: 85,
        4: 80,
        5: 75,
        6: 70,
        7: 65,
        8: 60,
        9: 55,
        10: 55,
        11: 45,
        12: 50,
        13: 35,
        14: 30,
        15: 30
    };
    let success;
    if (star <= 15) {
        success = successChances[star];
    } else {
        if (star === 16) success = 30;
        else if (star >= 17 && star <= 19) success = 15;
        else if (star === 20) success = 30;
        else if (star >= 21 && star <= 22) success = 15;
        else if (star >= 23 && star <= 25) success = 10;
        else if (star === 26) success = 7;
        else if (star === 27) success = 5;
        else if (star === 28) success = 3;
        else if (star === 29) success = 2;
        else if (star === 30) success = 1;
        else success = 0;
    }
    const boomChances = {
        15: 2.1,
        16: 2.1,
        17: 6.8,
        18: 6.8,
        19: 8.5,
        20: 10.5,
        21: 12.5,
        22: 17,
        23: 18,
        24: 18,
        25: 18,
        26: 18.6,
        27: 19,
        28: 19.4,
        29: 19.8
    };
    const boom = boomChances[star] || 0;
    const fail = 100 - success - boom;
    if (fail < 0) {
        throw new Error('Invalid probabilities: The sum of success and boom chances exceeds 100%.');
    }
    return {
        success,
        fail,
        boom
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/sf/cost.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getCost": (()=>getCost),
    "getNewCost": (()=>getNewCost)
});
function getCost(star, equip) {
    let totalCost = 0;
    let adjustLvl = Math.floor(equip / 10) * 10;
    let inner = 0;
    if (star < 10) {
        inner = adjustLvl ** 3 * (star + 1) / 2500 + 10;
    } else if (star === 10) {
        inner = adjustLvl ** 3 * (star + 1) ** 2.7 / 40000 + 10;
    } else if (star === 11) {
        inner = adjustLvl ** 3 * (star + 1) ** 2.7 / 22000 + 10;
    } else if (star === 12) {
        inner = adjustLvl ** 3 * (star + 1) ** 2.7 / 15000 + 10;
    } else if (star === 13) {
        inner = adjustLvl ** 3 * (star + 1) ** 2.7 / 11000 + 10;
    } else if (star === 14) {
        inner = adjustLvl ** 3 * (star + 1) ** 2.7 / 7500 + 10;
    } else if (star >= 15) {
        inner = adjustLvl ** 3 * (star + 1) ** 2.7 / 20000 + 10;
    }
    totalCost = Math.round(totalCost / 100) * 100;
    return totalCost.toLocaleString();
}
function getNewCost(star, equip) {
    const adjustLvl = Math.floor(equip / 10) * 10;
    const starLookup = {
        15: {
            denominator: 20000
        },
        16: {
            denominator: 20000
        },
        17: {
            multiplier: 1.31766055
        },
        18: {
            multiplier: 2.8571348
        },
        19: {
            multiplier: 4.44443047
        },
        20: {
            denominator: 20000
        },
        21: {
            multiplier: 1.59999951
        },
        22: {
            denominator: 20000
        },
        23: {
            denominator: 20000
        },
        24: {
            denominator: 20000
        },
        25: {
            denominator: 20000
        },
        26: {
            denominator: 20000
        },
        27: {
            denominator: 20000
        },
        28: {
            denominator: 20000
        },
        29: {
            denominator: 20000
        }
    };
    const { denominator, multiplier } = starLookup[star] || {
        denominator: getDefaultDenominator(star)
    };
    let inner = adjustLvl ** 3 * (star + 1) ** 2.7 / (denominator || 20000) + 10;
    if (multiplier) {
        inner *= multiplier;
    }
    const totalCost = Math.round(100 * inner / 100) * 100;
    return totalCost.toLocaleString();
}
function getDefaultDenominator(star) {
    if (star < 10) return 2500;
    switch(star){
        case 10:
            return 40000;
        case 11:
            return 22000;
        case 12:
            return 15000;
        case 13:
            return 11000;
        case 14:
            return 7500;
        default:
            return 20000;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/starforceCalc.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "calculateKMS": (()=>calculateKMS),
    "calculateStarforceStats": (()=>calculateStarforceStats)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$sf$2f$chance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/sf/chance.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$sf$2f$cost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/sf/cost.ts [app-client] (ecmascript)");
;
;
function calculateStarforceStats(startStar, endStar, equipLevel) {
    let totalExpectedCost = 0;
    let totalExpectedBooms = 0;
    let totalVarianceCost = 0;
    for(let star = startStar; star < endStar; star++){
        const { success, boom } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$sf$2f$chance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChance"])(star);
        const cost = parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$sf$2f$cost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCost"])(star, equipLevel).replace(/,/g, ''));
        const pSuccess = success / 100;
        const pBoom = boom / 100;
        const expectedAttempts = 1 / pSuccess;
        const varianceAttempts = (1 - pSuccess) / (pSuccess * pSuccess);
        totalExpectedCost += expectedAttempts * cost;
        totalExpectedBooms += pBoom * expectedAttempts;
        totalVarianceCost += expectedAttempts * Math.pow(cost, 2) + varianceAttempts * Math.pow(cost, 2);
    }
    const stdDev = Math.sqrt(totalVarianceCost);
    const luckyCost = totalExpectedCost - 1 * stdDev;
    const unluckyCost = totalExpectedCost + 1 * stdDev;
    const formatNumber = (num)=>num.toLocaleString();
    return {
        averageCost: formatNumber(Math.round(totalExpectedCost)),
        averageBooms: formatNumber(Math.round(totalExpectedBooms)),
        luckyCost: formatNumber(Math.round(luckyCost)),
        unluckyCost: formatNumber(Math.round(unluckyCost))
    };
}
function calculateKMS(startStar, endStar, equipLevel) {
    let totalExpectedCost = 0;
    let totalExpectedBooms = 0;
    let totalVarianceCost = 0;
    for(let star = startStar; star < endStar; star++){
        const { success, boom } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$sf$2f$chance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChance"])(star);
        const cost = parseFloat((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$sf$2f$cost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNewCost"])(star, equipLevel).replace(/,/g, ''));
        const pSuccess = success / 100;
        const pBoom = boom / 100;
        const expectedAttempts = 1 / pSuccess;
        const varianceAttempts = (1 - pSuccess) / (pSuccess * pSuccess);
        totalExpectedCost += expectedAttempts * cost;
        totalExpectedBooms += pBoom / (pBoom + pSuccess);
        totalVarianceCost += varianceAttempts * Math.pow(cost, 2);
    }
    const stdDev = Math.sqrt(totalVarianceCost);
    const luckyCost = totalExpectedCost - 1 * stdDev;
    const unluckyCost = totalExpectedCost + 1 * stdDev;
    const formatNumber = (num)=>num.toLocaleString();
    const roundedAverageBooms = Math.round(totalExpectedBooms * 100) / 100;
    return {
        averageCost: formatNumber(Math.round(totalExpectedCost)),
        averageBooms: roundedAverageBooms.toFixed(2),
        luckyCost: formatNumber(Math.round(luckyCost)),
        unluckyCost: formatNumber(Math.round(unluckyCost))
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Input": (()=>Input)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-full border border-[#00000033] bg-transparent px-3 py-1 text-base transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/switch.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Switch": (()=>Switch)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-switch/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Switch({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "switch",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#00000033] focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[24px] w-[48px] shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-pointer", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
            "data-slot": "switch-thumb",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-[20px] rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%+5px)] data-[state=unchecked]:translate-x-0")
        }, void 0, false, {
            fileName: "[project]/src/components/ui/switch.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/switch.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Switch;
;
var _c;
__turbopack_context__.k.register(_c, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/label.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Label": (()=>Label)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/select.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Select": (()=>Select),
    "SelectContent": (()=>SelectContent),
    "SelectGroup": (()=>SelectGroup),
    "SelectItem": (()=>SelectItem),
    "SelectLabel": (()=>SelectLabel),
    "SelectScrollDownButton": (()=>SelectScrollDownButton),
    "SelectScrollUpButton": (()=>SelectScrollUpButton),
    "SelectSeparator": (()=>SelectSeparator),
    "SelectTrigger": (()=>SelectTrigger),
    "SelectValue": (()=>SelectValue)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-[#00000033] data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-full items-center justify-between gap-2 rounded-full border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = "popper", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/starforce.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>StarForce)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$sf$2f$itemstats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/sf/itemstats.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$starforceCalc$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/starforceCalc.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function StarForce({ selectedGear }) {
    _s();
    const [inputs, setInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        itemLevel: selectedGear?.Level || null,
        startStar: '',
        endStar: ''
    });
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setInputs((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const calculate = ()=>{
        const itemLevelNum = Number(inputs.itemLevel);
        const startStarNum = Number(inputs.startStar);
        const endStarNum = Number(inputs.endStar);
        if (!itemLevelNum || isNaN(startStarNum) || isNaN(endStarNum)) {
            alert('Please fill all fields');
            return;
        }
        const starForceResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$starforceCalc$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateKMS"])(startStarNum, endStarNum, itemLevelNum);
        const statsResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$sf$2f$itemstats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(startStarNum, endStarNum, itemLevelNum);
        setResults({
            ...starForceResult,
            stats: statsResult
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col grow bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] h-full w-full justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[16px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[8px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "image/Star_Icon.svg",
                                        width: 16,
                                        height: 16,
                                        alt: "star"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        children: "Star Force Calculator"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                defaultChecked: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/starforce.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-[16px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[16px] w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p3",
                                            children: "MVP Discount"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/starforce.tsx",
                                            lineNumber: 92,
                                            columnNumber: 14
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "w-full",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "e.g. Silver"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                                children: "MVP Discount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 101,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: "none",
                                                                children: "None"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: "silver",
                                                                children: "Silver"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: "gold",
                                                                children: "Gold"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: "diamond",
                                                                children: "Diamond"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/starforce.tsx",
                                            lineNumber: 93,
                                            columnNumber: 14
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/starforce.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[16px] w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "p3",
                                                children: "Start Star"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                name: "startStar",
                                                value: inputs.startStar,
                                                onChange: handleInputChange,
                                                placeholder: "e.g. 0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 114,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "p3",
                                                children: "End Star"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                name: "endStar",
                                                value: inputs.endStar,
                                                onChange: handleInputChange,
                                                placeholder: "e.g. 15"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 124,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/starforce.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/starforce.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-[1px] rounded-full bg-black opacity-20"
            }, void 0, false, {
                fileName: "[project]/src/app/components/starforce.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[16px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-[16px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "Events",
                                children: "Events"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 139,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[8px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: "Star-Catching"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "Star-Catching",
                                        children: "Star Catching"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[8px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: "Safeguarding"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "Safeguarding",
                                        children: "Safeguarding"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[8px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: "30%-off"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "30%-off",
                                        children: "30% off"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[8px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: "-30%-booms"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "-30%-booms",
                                        children: "-30% booms <21"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 154,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/starforce.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-medium text-lg",
                                children: "Star Force Results"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Average Cost:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 163,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.averageCost
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Average Booms:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.averageBooms
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Lucky Cost:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.luckyCost
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Unlucky Cost:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.unluckyCost
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 184,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-medium",
                                        children: "Stat Differences"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Final Stats:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/starforce.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "ATK: ",
                                                            results.stats.finalStats.att
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "STAT: ",
                                                            results.stats.finalStats.stat
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Difference:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/starforce.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "ATK: +",
                                                            results.stats.difference.att
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "STAT: +",
                                                            results.stats.difference.stat
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/starforce.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/starforce.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/starforce.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(StarForce, "rff42ivoMO/Z4hYfghweH61HG5Y=");
_c = StarForce;
var _c;
__turbopack_context__.k.register(_c, "StarForce");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/cube/cubecombo.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>cubeCombo)
});
function cubeCombo(goal, tier) {
    const lPrime = tier === 'low' ? [
        12,
        9
    ] : [
        13,
        10
    ];
    const uPrime = tier === 'low' ? [
        9,
        6
    ] : [
        10,
        7
    ];
    const statValues = [
        ...new Set([
            ...lPrime,
            ...uPrime
        ])
    ];
    const { cd, cdr, stat } = goal;
    const results = [];
    // Line templates
    const cdLine = '8% CD';
    const cdrLine = '-2s CDR';
    const getStatLine = (val)=>{
        return lPrime.includes(val) ? `${val}% L` : `${val}% U`;
    };
    // Helper to create properly typed combinations
    const createCombo = (line1, line2, line3, stats)=>({
            lines: [
                line1,
                line2,
                line3
            ],
            stats
        });
    // Generate all position permutations
    function* generate() {
        // CDR cases
        if (cdr) {
            const cdrCount = cdr / 2;
            const statCount = 3 - cdrCount;
            // Case 1: Line 1 is CDR
            if (cdrCount > 0) {
                const positions = getPositions([
                    1,
                    2
                ], cdrCount - 1);
                for (const statCombo of getValidStatCombos(statCount, true)){
                    for (const pos of positions){
                        const lines = [
                            cdrLine,
                            '',
                            ''
                        ];
                        pos.forEach((p)=>lines[p + 1] = cdrLine);
                        fillRemainingLines(lines, statCombo);
                        yield createCombo(lines[0], lines[1], lines[2], {
                            totalStat: sumStats(statCombo),
                            totalCDR: cdr
                        });
                    }
                }
            }
            // Case 2: Line 1 is LPrime stat
            for (const lPrimeVal of lPrime){
                const positions = getPositions([
                    1,
                    2
                ], cdrCount);
                for (const statCombo of getValidStatCombos(statCount - 1, false)){
                    const totalStat = lPrimeVal + sumStats(statCombo);
                    if (stat && totalStat < stat) continue;
                    for (const pos of positions){
                        const lines = [
                            getStatLine(lPrimeVal),
                            '',
                            ''
                        ];
                        pos.forEach((p)=>lines[p + 1] = cdrLine);
                        fillRemainingLines(lines, statCombo);
                        yield createCombo(lines[0], lines[1], lines[2], {
                            totalStat,
                            totalCDR: cdr
                        });
                    }
                }
            }
            return;
        }
        // CD cases
        if (cd) {
            const cdCount = cd / 8;
            // Case 1: Line 1 is CD
            if (cdCount > 0) {
                const positions = getPositions([
                    1,
                    2
                ], cdCount - 1);
                for (const statCombo of getValidStatCombos(3 - cdCount, true)){
                    for (const pos of positions){
                        const lines = [
                            cdLine,
                            '',
                            ''
                        ];
                        pos.forEach((p)=>lines[p + 1] = cdLine);
                        fillRemainingLines(lines, statCombo);
                        yield createCombo(...lines, {
                            totalStat: sumStats(statCombo),
                            totalCD: cd
                        });
                    }
                }
            }
            // Case 2: Line 1 is LPrime stat
            for (const lPrimeVal of lPrime){
                const positions = getPositions([
                    1,
                    2
                ], cdCount);
                for (const statCombo of getValidStatCombos(2 - cdCount, false)){
                    const totalStat = lPrimeVal + sumStats(statCombo);
                    if (stat && totalStat < stat) continue;
                    for (const pos of positions){
                        const lines = [
                            getStatLine(lPrimeVal),
                            '',
                            ''
                        ];
                        pos.forEach((p)=>lines[p + 1] = cdLine);
                        fillRemainingLines(lines, statCombo);
                        yield createCombo(...lines, {
                            totalStat,
                            totalCD: cd
                        });
                    }
                }
            }
            return;
        }
        // Stat-only case (Line 1 must be LPrime)
        for (const lPrimeVal of lPrime){
            for (const [stat2, stat3] of getCombinationsWithReplacement(statValues, 2)){
                const totalStat = lPrimeVal + stat2 + stat3;
                if (stat && totalStat < stat) continue;
                yield createCombo(getStatLine(lPrimeVal), getStatLine(stat2), getStatLine(stat3), {
                    totalStat
                });
            }
        }
    }
    // Helper functions
    function getPositions(availablePositions, count) {
        if (count === 0) return [
            []
        ];
        return availablePositions.flatMap((pos, i)=>getPositions(availablePositions.slice(i + 1), count - 1).map((rest)=>[
                    pos,
                    ...rest
                ]));
    }
    function* getValidStatCombos(count, allowUPrime) {
        const validStats = allowUPrime ? statValues : lPrime;
        if (count <= 0) yield [];
        else yield* getCombinationsWithReplacement(validStats, count);
    }
    function fillRemainingLines(lines, stats) {
        let statIdx = 0;
        for(let i = 0; i < 3; i++){
            if (lines[i] === '') lines[i] = getStatLine(stats[statIdx++]);
        }
    }
    function sumStats(stats) {
        return stats.reduce((a, b)=>a + b, 0);
    }
    function* getCombinationsWithReplacement(values, length) {
        if (length === 1) {
            for (const v of values)yield [
                v
            ];
        } else {
            for (const v of values){
                for (const rest of getCombinationsWithReplacement(values, length - 1)){
                    yield [
                        v,
                        ...rest
                    ];
                }
            }
        }
    }
    // Execute generation
    for (const combo of generate()){
        results.push(combo);
    }
    return results;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/cube/addpotlines.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>aggregateLines)
});
function aggregateLines(lines) {
    const result = {};
    for (const line of Object.values(lines)){
        if (!line) continue;
        try {
            const parsed = JSON.parse(line);
            Object.keys(parsed).forEach((key)=>{
                const value = parsed[key];
                if (typeof value === 'number') {
                    result[key] = (result[key] || 0) + value;
                }
            });
        } catch (e) {
            console.warn('Failed to parse line:', line);
        }
    }
    return result;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/potentialcalc.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "lPrime": (()=>lPrime),
    "potCalc": (()=>potCalc),
    "uPrime": (()=>uPrime)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$cubecombo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/cube/cubecombo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$addpotlines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/cube/addpotlines.ts [app-client] (ecmascript)");
;
;
const CUBE_COST = {
    black: 22000000,
    red: 12000000
};
const VALID_TARGETS_BY_POTENTIAL_TYPE = {
    stat: [
        24,
        27,
        30,
        33,
        36,
        39
    ],
    cdr: [
        1,
        2,
        3,
        4,
        5,
        6
    ],
    cd: [
        8,
        16,
        24
    ]
};
const lPrime = {
    low: [
        12,
        9
    ],
    high: [
        13,
        10
    ]
};
const uPrime = {
    low: [
        9,
        6
    ],
    high: [
        10,
        7
    ]
};
function potCalc(itemLevel, cubeType, startingTier, desiredTier, lines) {
    const tier = itemLevel > 150 ? 'high' : 'low';
    const cost = CUBE_COST[cubeType];
    const addedUpLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$addpotlines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(lines);
    const getComboProbability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$cubecombo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(addedUpLines, tier);
// return {
//   averageCost,
//   totalProbability,
//   averageTry,
//   combinations: formatCombinations(combinations),
// };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/cube/potentialdropdown.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WSE": (()=>WSE),
    "getGoalOptions": (()=>getGoalOptions)
});
const STAT_TIERS = {
    low: [
        24,
        27,
        30,
        33
    ],
    high: [
        30,
        33,
        36,
        39
    ]
};
const FIRST_LINE = {
    low: [
        12,
        9
    ],
    high: [
        13,
        10
    ]
};
const OTHER_LINE = {
    low: [
        12,
        9,
        6
    ],
    high: [
        13,
        10,
        7
    ]
};
const WSE = {
    low: {
        weapon: {
            att: [
                9,
                18,
                21,
                30,
                33,
                36
            ],
            boss: [
                30,
                35,
                40
            ],
            ied: [
                30,
                35,
                40
            ]
        },
        secondary: {
            att: [
                30,
                35,
                40
            ],
            boss: [
                30,
                35,
                40
            ],
            ied: [
                30,
                35,
                40
            ]
        },
        emblem: {
            att: [
                30,
                35,
                40
            ],
            ied: [
                30,
                35,
                40
            ]
        }
    },
    high: {
        weapon: {
            att: [
                10,
                20,
                23,
                33,
                36,
                39
            ],
            boss: [
                30,
                35,
                40
            ],
            ied: [
                30,
                35,
                40
            ]
        },
        secondary: {
            att: [
                30,
                35,
                40
            ],
            boss: [
                30,
                35,
                40
            ],
            ied: [
                30,
                35,
                40
            ]
        },
        emblem: {
            att: [
                30,
                35,
                40
            ],
            ied: [
                30,
                35,
                40
            ]
        }
    }
};
const getGoalOptions = (itemType, itemLevel, lineNumber = 1)=>{
    const tier = itemLevel > 150 ? 'high' : 'low';
    const currentStatTier = STAT_TIERS[tier];
    const firstLine = FIRST_LINE[tier];
    const otherLines = OTHER_LINE[tier];
    // Handle WSE items (weapon, secondary, emblem)
    if ([
        'weapon',
        'secondary',
        'emblem'
    ].includes(itemType)) {
        const combinations = generateWSECombinations(itemType, itemLevel);
        return Object.fromEntries(combinations.map((combo)=>{
            const label = formatWSEOption(combo);
            return [
                label,
                combo
            ];
        }));
    }
    switch(itemType){
        case 'HAT':
            {
                const hatStatOptions = lineNumber === 1 ? firstLine.map((stat)=>[
                        `${stat}% Stat`,
                        {
                            stat
                        }
                    ]) : otherLines.map((stat)=>[
                        `${stat}% Stat`,
                        {
                            stat
                        }
                    ]);
                const hatCdrOptions = [
                    1,
                    2
                ].map((cdr)=>[
                        `-${cdr} second cooldown`,
                        {
                            cdr
                        }
                    ]);
                return {
                    ...Object.fromEntries(hatCdrOptions),
                    ...Object.fromEntries(hatStatOptions)
                };
            }
        case 'GLOVES':
            {
                const gloveStatOptions = lineNumber === 1 ? firstLine.map((stat)=>[
                        `${stat}% Stat`,
                        {
                            stat
                        }
                    ]) : otherLines.map((stat)=>[
                        `${stat}% Stat`,
                        {
                            stat
                        }
                    ]);
                const gloveCdOptions = [
                    [
                        '8% Crit Damage',
                        {
                            cd: 8
                        }
                    ]
                ];
                return {
                    ...Object.fromEntries(gloveCdOptions),
                    ...Object.fromEntries(gloveStatOptions)
                };
            }
        default:
            {
                const statValues = lineNumber === 1 ? firstLine : otherLines;
                return Object.fromEntries(statValues.map((stat)=>[
                        `${stat}% Stat`,
                        {
                            stat
                        }
                    ]));
            }
    }
};
// Helper functions for WSE
const generateWSECombinations = (itemType, itemLevel)=>{
    const tier = itemLevel > 150 ? 'high' : 'low';
    const itemData = WSE[tier][itemType];
    const combinations = [];
    itemData.att.forEach((attValue)=>{
        // Base combination
        combinations.push({
            att: attValue
        });
        if (attValue >= 30) return;
        // Handle boss if exists
        if ('boss' in itemData) {
            itemData.boss.forEach((bossValue)=>{
                combinations.push({
                    att: attValue,
                    boss: bossValue
                });
            });
        }
        // Handle ied if exists
        if ('ied' in itemData) {
            itemData.ied.forEach((iedValue)=>{
                combinations.push({
                    att: attValue,
                    ied: iedValue
                });
            });
        }
        // Handle combined boss+ied if both exist
        if ('boss' in itemData && 'ied' in itemData && (attValue === 9 || attValue === 10)) {
            itemData.boss.forEach((bossValue)=>{
                itemData.ied.forEach((iedValue)=>{
                    combinations.push({
                        att: attValue,
                        boss: bossValue,
                        ied: iedValue
                    });
                });
            });
        }
    });
    return combinations;
};
const formatWSEOption = (combo)=>{
    const parts = [
        `${combo.att} ATT`
    ];
    if (combo.boss) parts.push(`${combo.boss} Boss`);
    if (combo.ied) parts.push(`${combo.ied} IED`);
    return parts.join(' + ');
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/cube.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Cube)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$potentialcalc$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/potentialcalc.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$potentialdropdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/cube/potentialdropdown.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function Cube({ selectedGear }) {
    _s();
    const [inputs, setInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        itemType: selectedGear?.Type || '',
        startingTier: 'rare',
        desiredTier: 'legendary',
        cubeType: 'black',
        itemLevel: selectedGear?.Level || 0
    });
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        line1: '',
        line2: '',
        line3: ''
    });
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const lineOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Cube.useMemo[lineOptions]": ()=>{
            if (!inputs.itemType || !inputs.itemLevel) return {
                line1: {},
                line2: {},
                line3: {}
            };
            return {
                line1: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$potentialdropdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGoalOptions"])(inputs.itemType, inputs.itemLevel, 1),
                line2: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$potentialdropdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGoalOptions"])(inputs.itemType, inputs.itemLevel, 2),
                line3: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$potentialdropdown$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGoalOptions"])(inputs.itemType, inputs.itemLevel, 3)
            };
        }
    }["Cube.useMemo[lineOptions]"], [
        inputs.itemType,
        inputs.itemLevel
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Cube.useEffect": ()=>{
            if (selectedGear) {
                setInputs({
                    "Cube.useEffect": (prev)=>({
                            ...prev,
                            itemType: selectedGear.Type,
                            itemLevel: selectedGear.Level
                        })
                }["Cube.useEffect"]);
                setLines({
                    line1: '',
                    line2: '',
                    line3: ''
                });
            }
        }
    }["Cube.useEffect"], [
        selectedGear
    ]);
    const handleLineChange = (line, value)=>{
        setLines((prev)=>({
                ...prev,
                [line]: value
            }));
    };
    const calculate = ()=>{
        try {
            const potentialResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$potentialcalc$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["potCalc"])(inputs.itemLevel, inputs.cubeType, inputs.startingTier, inputs.desiredTier, {
                first: lines.line1 || '',
                second: lines.line2 || '',
                third: lines.line3 || ''
            });
            setResults(potentialResult);
        } catch (error) {
            console.error('Calculation error:', error);
        // Handle error (show toast, etc.)
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] w-full gap-[16px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-[8px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/image/Cube_Icon.svg",
                                width: 14,
                                height: 16,
                                alt: "Cube icon"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Potential Calculator"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                        defaultChecked: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/cube.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[16px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full gap-[16px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "p3",
                                        children: "Starting Tier"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: inputs.cubeType,
                                        onValueChange: (value)=>setInputs((prev)=>({
                                                    ...prev,
                                                    cubeType: value
                                                })),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "w-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Starting Tier"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 115,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                            children: "Cube Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "rare",
                                                            children: "Rare"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "epic",
                                                            children: "Epic"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "unique",
                                                            children: "Unique"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 123,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "legendary",
                                                            children: "Legendary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "p3",
                                        children: "Desired Tier"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: inputs.cubeType,
                                        onValueChange: (value)=>setInputs((prev)=>({
                                                    ...prev,
                                                    cubeType: value
                                                })),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "w-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Desired Tier"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 137,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                            children: "Cube Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "rare",
                                                            children: "Rare"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "epic",
                                                            children: "Epic"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 144,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "unique",
                                                            children: "Unique"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 145,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "legendary",
                                                            children: "Legendary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/cube.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p3",
                                children: "Cube Type"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: inputs.cubeType,
                                onValueChange: (value)=>setInputs((prev)=>({
                                            ...prev,
                                            cubeType: value
                                        })),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select cube type..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/cube.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                    children: "Cube Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "black",
                                                    children: "Black Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "red",
                                                    children: "Red Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/cube.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p3",
                                children: "Line 1 (Primary)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: lines.line1,
                                onValueChange: (value)=>handleLineChange('line1', value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select Line 1..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/cube.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                    children: "Primary Line Options"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 17
                                                }, this),
                                                Object.entries(lineOptions.line1).map(([label, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: JSON.stringify(value),
                                                        children: label
                                                    }, label, false, {
                                                        fileName: "[project]/src/app/components/cube.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/cube.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p3",
                                children: "Line 2 (Secondary)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: lines.line2,
                                onValueChange: (value)=>handleLineChange('line2', value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select Line 2..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/cube.tsx",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                    children: "Secondary Line Options"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 205,
                                                    columnNumber: 17
                                                }, this),
                                                Object.entries(lineOptions.line2).map(([label, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: JSON.stringify(value),
                                                        children: label
                                                    }, label, false, {
                                                        fileName: "[project]/src/app/components/cube.tsx",
                                                        lineNumber: 207,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/cube.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 203,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p3",
                                children: "Line 3 (Secondary)"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: lines.line3,
                                onValueChange: (value)=>handleLineChange('line3', value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select Line 3..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/cube.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                    children: "Secondary Line Options"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 17
                                                }, this),
                                                Object.entries(lineOptions.line3).map(([label, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: JSON.stringify(value),
                                                        children: label
                                                    }, label, false, {
                                                        fileName: "[project]/src/app/components/cube.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/cube.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 226,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: calculate,
                        className: "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600",
                        children: "Calculate"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-medium text-lg",
                                children: "Potential Results"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Average Cost:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 252,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    results.averageCost,
                                                    " mesos"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Success Chance:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 258,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    (results.totalProbability * 100).toFixed(6),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Average Attempts:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/cube.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 264,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.averageTry.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 267,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 263,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-medium",
                                        children: "Valid Combinations"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-60 overflow-y-auto mt-2 border rounded p-2",
                                        children: results.combinations.map((combo, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-1 border-b last:border-b-0",
                                                children: [
                                                    "Line 1: ",
                                                    combo.line1,
                                                    ", Line 2: ",
                                                    combo.line2,
                                                    ", Line 3:",
                                                    ' ',
                                                    combo.line3
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/components/cube.tsx",
                                                lineNumber: 275,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/cube.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/cube.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/cube.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/cube.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/cube.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(Cube, "F+ZNH3KjA8scsRLMzlTJnRebrro=");
_c = Cube;
var _c;
__turbopack_context__.k.register(_c, "Cube");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        }), "w-full bg-black rounded-full text-white h-[32px]"),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/data.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("[{\"Item Name\":\"Condensed_Power_Crystal\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Face Accessory\",\"Level\":110,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Aquatic_Letter_Eye_Accessory\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Eye Accessory\",\"Level\":100,\"Main Stat\":6,\"Sub Stat\":6,\"HP\":\"\",\"MP\":\"\",\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Black_Bean_Mark\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Eye Accessory\",\"Level\":135,\"Main Stat\":7,\"Sub Stat\":7,\"HP\":\"\",\"MP\":\"\",\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Papulatus_Mark\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Eye Accessory\",\"Level\":145,\"Main Stat\":8,\"Sub Stat\":8,\"HP\":\"\",\"MP\":\"\",\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Dea_Sidus_Earrings\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Earrings\",\"Level\":130,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Will_o'_The_Wisp_Earrings\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Earrings\",\"Level\":130,\"Main Stat\":7,\"Sub Stat\":7,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Silver_Blossom_Ring\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Ring\",\"Level\":110,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Noble_Ifia's_Ring\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Ring\",\"Level\":120,\"Main Stat\":\"\",\"Sub Stat\":\"\",\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Guardian_Angel_Ring\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Ring\",\"Level\":160,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Horntail_Necklace\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Pendant\",\"Level\":120,\"Main Stat\":7,\"Sub Stat\":7,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Chaos_Horntail_Necklace\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Pendant\",\"Level\":120,\"Main Stat\":10,\"Sub Stat\":10,\"HP\":\"10%\",\"MP\":\"10%\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Mechanator_Necklace\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Pendant\",\"Level\":140,\"Main Stat\":10,\"Sub Stat\":10,\"HP\":250,\"MP\":250,\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Dominator_Necklace\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Accessory\",\"Sub-Type\":\"Pendant\",\"Level\":130,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"10%\",\"MP\":\"10%\",\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Golden_Clover_Belt\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Belt\",\"Level\":140,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":150,\"MP\":150,\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Royal_Black_Metal_Shoulder\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":130,\"Main Stat\":10,\"Sub Stat\":10,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Enraged_Zakum_Belt\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Belt\",\"Level\":140,\"Main Stat\":18,\"Sub Stat\":18,\"HP\":150,\"MP\":150,\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Stone_Of_Eternal_Life\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Pocket\",\"Sub-Type\":\"Pocket\",\"Level\":0,\"Main Stat\":3,\"Sub Stat\":3,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Pinky_Holy_Cup\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Pocket\",\"Sub-Type\":\"Pocket\",\"Level\":140,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":50,\"MP\":50,\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Crystal_Ventus_Badge\",\"Job\":\"\",\"Set\":\"Boss\",\"Type\":\"Badge\",\"Sub-Type\":\"Badge\",\"Level\":130,\"Main Stat\":10,\"Sub Stat\":10,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Kanna's_Treasure\",\"Job\":\"\",\"Set\":\"\",\"Type\":\"Accessory\",\"Sub-Type\":\"Ring\",\"Level\":140,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":200,\"MP\":200,\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Twilight_Mark\",\"Job\":\"\",\"Set\":\"Dawn\",\"Type\":\"Accessory\",\"Sub-Type\":\"Face Accessory\",\"Level\":140,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Estella_Earrings\",\"Job\":\"\",\"Set\":\"Dawn\",\"Type\":\"Accessory\",\"Sub-Type\":\"Earrings\",\"Level\":160,\"Main Stat\":7,\"Sub Stat\":7,\"HP\":300,\"MP\":300,\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Dawn_Guardian_Angel_Ring\",\"Job\":\"\",\"Set\":\"Dawn\",\"Type\":\"Accessory\",\"Sub-Type\":\"Ring\",\"Level\":160,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":200,\"MP\":200,\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Daybreak_Pendant\",\"Job\":\"\",\"Set\":\"Dawn\",\"Type\":\"Accessory\",\"Sub-Type\":\"Pendant\",\"Level\":140,\"Main Stat\":8,\"Sub Stat\":8,\"HP\":\"5%\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Reinforced_Gollux_Earrings\",\"Job\":\"\",\"Set\":\"Reinforced\",\"Type\":\"Accessory\",\"Sub-Type\":\"Earrings\",\"Level\":140,\"Main Stat\":12,\"Sub Stat\":12,\"HP\":150,\"MP\":150,\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Reinforced_Gollux_Ring\",\"Job\":\"\",\"Set\":\"Reinforced\",\"Type\":\"Accessory\",\"Sub-Type\":\"Ring\",\"Level\":140,\"Main Stat\":8,\"Sub Stat\":8,\"HP\":200,\"MP\":200,\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Reinforced_Gollux_Pendant\",\"Job\":\"\",\"Set\":\"Reinforced\",\"Type\":\"Accessory\",\"Sub-Type\":\"Pendant\",\"Level\":140,\"Main Stat\":23,\"Sub Stat\":23,\"HP\":300,\"MP\":300,\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Reinforced_Gollux_Belt\",\"Job\":\"\",\"Set\":\"Reinforced\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Belt\",\"Level\":140,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":200,\"MP\":200,\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Superior_Gollux_Earrings\",\"Job\":\"\",\"Set\":\"Superior\",\"Type\":\"Accessory\",\"Sub-Type\":\"Earrings\",\"Level\":150,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":150,\"MP\":150,\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Superior_Gollux_Ring\",\"Job\":\"\",\"Set\":\"Superior\",\"Type\":\"Accessory\",\"Sub-Type\":\"Ring\",\"Level\":150,\"Main Stat\":10,\"Sub Stat\":10,\"HP\":250,\"MP\":250,\"ATK\":8,\"M.ATK\":8,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Superior_Gollux_Pendant\",\"Job\":\"\",\"Set\":\"Superior\",\"Type\":\"Accessory\",\"Sub-Type\":\"Pendant\",\"Level\":150,\"Main Stat\":28,\"Sub Stat\":28,\"HP\":300,\"MP\":300,\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Superior_Gollux_Belt\",\"Job\":\"\",\"Set\":\"Superior\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Belt\",\"Level\":150,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":200,\"MP\":200,\"ATK\":35,\"M.ATK\":35,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Beserked\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Accessory\",\"Sub-Type\":\"Face Accessory\",\"Level\":160,\"Main Stat\":10,\"Sub Stat\":10,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Magic_Eyepatch\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Accessory\",\"Sub-Type\":\"Eye Accessory\",\"Level\":160,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Commanding_Force_Earrings\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Accessory\",\"Sub-Type\":\"Earrings\",\"Level\":200,\"Main Stat\":7,\"Sub Stat\":7,\"HP\":500,\"MP\":500,\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Endless_Terror\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Accessory\",\"Sub-Type\":\"Ring\",\"Level\":200,\"Main Stat\":5,\"Sub Stat\":5,\"HP\":250,\"MP\":250,\"ATK\":4,\"M.ATK\":4,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Source_Of_Suffering\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Accessory\",\"Sub-Type\":\"Pendant\",\"Level\":160,\"Main Stat\":10,\"Sub Stat\":10,\"HP\":\"5%\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Dreamy_Belt\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Belt\",\"Level\":200,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":150,\"MP\":150,\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Cursed_Spellbook\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Pocket\",\"Sub-Type\":\"Pocket\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":10,\"HP\":100,\"MP\":100,\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Black_Heart\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Heart\",\"Sub-Type\":\"Heart\",\"Level\":120,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":100,\"MP\":\"\",\"ATK\":77,\"M.ATK\":77,\"IED\":30,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Total_Control\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Heart\",\"Sub-Type\":\"Heart\",\"Level\":200,\"Main Stat\":25,\"Sub Stat\":25,\"HP\":1250,\"MP\":\"\",\"ATK\":15,\"M.ATK\":15,\"IED\":30,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Genesis_Badge\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Badge\",\"Sub-Type\":\"Badge\",\"Level\":200,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Mitra's_Rage\",\"Job\":\"\",\"Set\":\"Pitch\",\"Type\":\"Emblem\",\"Sub-Type\":\"Emblem\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Royal_Warrior_Hat\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":360,\"MP\":360,\"ATK\":2,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"EagleEye_Warrior_Shirt\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Trixter_Warrior_Pants\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Warrior_Shoes\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Warrior_Gloves\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Warrior_Cape\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":160,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Warrior_Shoulder\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":160,\"Main Stat\":14,\"Sub Stat\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Warrior_Hat\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":200,\"Main Stat\":45,\"Sub Stat\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Warrior_Shoes\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Warrior_Gloves\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Warrior_Cape\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Warrior_Shoulder\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Warrior_Hat\",\"Job\":\"Warrior\",\"Set\":\"Eternal\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":250,\"Main Stat\":80,\"Sub Stat\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":\"\",\"IED\":15,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Warrior_Shirt\",\"Job\":\"Warrior\",\"Set\":\"Eternal\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Warrior_Pants\",\"Job\":\"Warrior\",\"Set\":\"Eternal\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Warrior_Shoes\",\"Job\":\"Warrior\",\"Set\":\"Eternal\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Warrior_Gloves\",\"Job\":\"Warrior\",\"Set\":\"Eternal\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Warrior_Cape\",\"Job\":\"Warrior\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Warrior_Shoulder\",\"Job\":\"Warrior\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":250,\"Main Stat\":51,\"Sub Stat\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":28,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Fafnir_One-Handed_Sword\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Sword\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Two-Handed_Sword\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Sword\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_One-Handed_Axe\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Axe\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Two-Handed_Axe\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Axe\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_One-Handed_Blunt_Weapon\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Blunt Weapon\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Two-Handed_Blunt_Weapon\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Bluent Weapon\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Spear\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Spear\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Polearm\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Polearm\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":153,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Bladecaster\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Bladecaster\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Katana\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Katana\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Arm_Cannon\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Arm Cannon\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":128,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Desperado\",\"Job\":\"Warrior\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Desperado\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":\"\",\"HP\":2000,\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_One-Handed_Sword\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Sword\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Two-Handed_Sword\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Sword\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_One-Handed_Axe\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Axe\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Two-Handed_Axe\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Axe\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_One-Handed_Blunt_Weapon\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Blunt Weapon\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Two-Handed_Blunt_Weapon\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Bluent Weapon\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Spear\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Spear\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Polearm\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Polearm\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":184,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Bladecaster\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Bladecaster\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Katana\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Katana\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Arm_Cannon\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Arm Cannon\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":154,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Desperado\",\"Job\":\"Warrior\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Desperado\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":\"\",\"HP\":2250,\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_One-Handed_Sword\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Sword\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Two-Handed_Sword\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Sword\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_One-Handed_Axe\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Axe\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Two-Handed_Axe\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Axe\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_One-Handed_Blunt_Weapon\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Blunt Weapon\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Two-Handed_Blunt_Weapon\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Bluent Weapon\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Spear\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Spear\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Polearm\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Polearm\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":264,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Bladecaster\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Bladecaster\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Katana\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Katana\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Arm_Cannon\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Arm Cannon\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":221,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Desperado\",\"Job\":\"Warrior\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Desperado\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":\"\",\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_One-Handed_Sword\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Sword\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Two-Handed_Sword\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Sword\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_One-Handed_Axe\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Axe\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Two-Handed_Axe\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Axe\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_One-Handed_Blunt_Weapon\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"One-Handed Blunt Weapon\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Two-Handed_Blunt_Weapon\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Two-Handed Bluent Weapon\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Spear\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Spear\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Polearm\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Polearm\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":304,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Bladecaster\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Bladecaster\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Katana\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Katana\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Arm_Cannon\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Arm Cannon\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":255,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Desperado\",\"Job\":\"Warrior\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Desperado\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":\"\",\"HP\":2800,\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Royal_Dunwitch_Hat\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":360,\"MP\":360,\"ATK\":\"\",\"M.ATK\":2,\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"EagleEye_Dunwitch_Shirt\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Trixter_Dunwitch_Pants\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Mage_Shoes\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Mage_Gloves\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":5,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Mage_Cape\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":160,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Mage_Shoulder\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":160,\"Main Stat\":14,\"Sub Stat\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Mage_Hat\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":200,\"Main Stat\":45,\"Sub Stat\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":3,\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Mage_Shoes\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":9,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Mage_Gloves\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":9,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Mage_Cape\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":6,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Mage_Shoulder\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":20,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Mage_Hat\",\"Job\":\"Mage\",\"Set\":\"Eternal\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":250,\"Main Stat\":80,\"Sub Stat\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":10,\"IED\":15,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Mage_Shirt\",\"Job\":\"Mage\",\"Set\":\"Eternal\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":6,\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Mage_Pants\",\"Job\":\"Mage\",\"Set\":\"Eternal\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":6,\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Mage_Shoes\",\"Job\":\"Mage\",\"Set\":\"Eternal\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":12,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Mage_Gloves\",\"Job\":\"Mage\",\"Set\":\"Eternal\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":12,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Mage_Cape\",\"Job\":\"Mage\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":9,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Mage_Shoulder\",\"Job\":\"Mage\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":250,\"Main Stat\":51,\"Sub Stat\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":28,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Wand\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Wand\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Staff\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Staff\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":126,\"M.ATK\":204,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Shining_Rod\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Shining Rod\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Psy-Limiter\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Psy-Limiter\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Fan\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Fan\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":126,\"M.ATK\":204,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Lucent_Gauntlet\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Lucent Gauntlet\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Memorial_Staff\",\"Job\":\"Mage\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Memorial Staff\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Wand\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Wand\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Staff\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Staff\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":151,\"M.ATK\":245,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Shining_Rod\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Shining Rod\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Psy-Limiter\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Psy-Limiter\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Fan\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Fan\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Lucent_Gauntlet\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Lucent Gauntlet\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Memorial_Staff\",\"Job\":\"Mage\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Memorial Staff\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Wand\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Wand\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Staff\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Staff\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":218,\"M.ATK\":353,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Shining_Rod\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Shining Rod\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Psy-Limiter\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Psy-Limiter\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Fan\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Fan\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Lucent_Gauntlet\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Lucent Gauntlet\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Memorial_Staff\",\"Job\":\"Mage\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Memorial Staff\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Wand\",\"Job\":\"Mage\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Wand\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Staff\",\"Job\":\"Mage\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Staff\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":251,\"M.ATK\":406,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Shining_Rod\",\"Job\":\"Mage\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Shining Rod\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Psy-Limiter\",\"Job\":\"Mage\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Psy-Limiter\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Fan\",\"Job\":\"Mage\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Fan\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Lucent_Gauntlet\",\"Job\":\"Mage\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Lucent Gauntlet\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Memorial_Staff\",\"Job\":\"Mage\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Memorial Staff\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Royal_Ranger_Hat\",\"Job\":\"Bowman\",\"Set\":\"CRA\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":360,\"MP\":360,\"ATK\":2,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"EagleEye_Ranger_Shirt\",\"Job\":\"Bowman\",\"Set\":\"CRA\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Trixter_Ranger_Pants\",\"Job\":\"Bowman\",\"Set\":\"CRA\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Bowman_Shoes\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Bowman_Gloves\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Bowman_Cape\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":160,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Bowman_Shoulder\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":160,\"Main Stat\":14,\"Sub Stat\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Bowman_Hat\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":200,\"Main Stat\":45,\"Sub Stat\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Bowman_Shoes\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Bowman_Gloves\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Gloves\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Bowman_Cape\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Bowman_Shoulder\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Bowman_Hat\",\"Job\":\"Bowman\",\"Set\":\"Eternal\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":250,\"Main Stat\":80,\"Sub Stat\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":\"\",\"IED\":15,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Bowman_Shirt\",\"Job\":\"Bowman\",\"Set\":\"Eternal\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Bowman_Pants\",\"Job\":\"Bowman\",\"Set\":\"Eternal\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Bowman_Shoes\",\"Job\":\"Bowman\",\"Set\":\"Eternal\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Bowman_Gloves\",\"Job\":\"Bowman\",\"Set\":\"Eternal\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Bowman_Cape\",\"Job\":\"Bowman\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Bowman_Shoulder\",\"Job\":\"Bowman\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":250,\"Main Stat\":51,\"Sub Stat\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":28,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Bow\",\"Job\":\"Bowman\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Bow\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Crossbow\",\"Job\":\"Bowman\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Crossbow\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Dual_Bowguns\",\"Job\":\"Bowman\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Dual Bowguns\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Whispershot\",\"Job\":\"Bowman\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Whispershot\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Ancient_Bow\",\"Job\":\"Bowman\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Ancient Bow\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Bow\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Bow\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Crossbow\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Crossbow\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Dual_Bowguns\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Dual Bowguns\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Whispershot\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Whispershot\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Ancient_Bow\",\"Job\":\"Bowman\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Ancient Bow\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Bow\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Bow\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Crossbow\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Crossbow\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Dual_Bowguns\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Dual Bowguns\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Whispershot\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Whispershot\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Ancient_Bow\",\"Job\":\"Bowman\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Ancient Bow\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Bow\",\"Job\":\"Bowman\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Bow\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Crossbow\",\"Job\":\"Bowman\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Crossbow\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Dual_Bowguns\",\"Job\":\"Bowman\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Dual Bowguns\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Whispershot\",\"Job\":\"Bowman\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Whispershot\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Ancient_Bow\",\"Job\":\"Bowman\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Ancient Bow\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Royal_Assassin_Hat\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":360,\"MP\":360,\"ATK\":2,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"EagleEye_Assassin_Shirt\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Trixter_Assassin_Pants\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Thief_Shoes\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Thief_Gloves\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Thief_Cape\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":160,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Thief_Shoulder\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":160,\"Main Stat\":14,\"Sub Stat\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Thief_Hat\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":200,\"Main Stat\":45,\"Sub Stat\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Thief_Shoes\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Thief_Gloves\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Thief_Cape\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Thief_Shoulder\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Thief_Hat\",\"Job\":\"Thief\",\"Set\":\"Eternal\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":250,\"Main Stat\":80,\"Sub Stat\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":\"\",\"IED\":15,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Thief_Shirt\",\"Job\":\"Thief\",\"Set\":\"Eternal\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Thief_Pants\",\"Job\":\"Thief\",\"Set\":\"Eternal\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Thief_Shoes\",\"Job\":\"Thief\",\"Set\":\"Eternal\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Thief_Gloves\",\"Job\":\"Thief\",\"Set\":\"Eternal\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Thief_Cape\",\"Job\":\"Thief\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Thief_Shoulder\",\"Job\":\"Thief\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":250,\"Main Stat\":51,\"Sub Stat\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":28,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Dagger\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Dagger\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Claw\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Claw\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":86,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Cane\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Cane\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Chakram\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Chakram\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Whipblade\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Whipblade\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":128,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Chain\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Chain\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Ritual_Fan\",\"Job\":\"Thief\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Ritual Fan\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Dagger\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Dagger\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Claw\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Claw\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":103,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Cane\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Cane\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Chakram\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Chakram\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Whipblade\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Whipblade\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":154,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Chain\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Chain\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Ritual_Fan\",\"Job\":\"Thief\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Ritual Fan\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Dagger\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Dagger\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Claw\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Claw\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":149,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Cane\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Cane\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Chakram\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Chakram\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Whipblade\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Whipblade\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":221,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Chain\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Chain\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Ritual_Fan\",\"Job\":\"Thief\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Ritual Fan\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Dagger\",\"Job\":\"Thief\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Dagger\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Claw\",\"Job\":\"Thief\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Claw\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":172,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Cane\",\"Job\":\"Thief\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Cane\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Chakram\",\"Job\":\"Thief\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Chakram\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Whipblade\",\"Job\":\"Thief\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Whipblade\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":255,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Chain\",\"Job\":\"Thief\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Chain\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Ritual_Fan\",\"Job\":\"Thief\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Ritual Fan\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Royal_Wanderer_Hat\",\"Job\":\"Pirate\",\"Set\":\"CRA\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":360,\"MP\":360,\"ATK\":2,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"EagleEye_Wanderer_Shirt\",\"Job\":\"Pirate\",\"Set\":\"CRA\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Trixter_Wanderer_Pants\",\"Job\":\"Pirate\",\"Set\":\"CRA\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":150,\"Main Stat\":30,\"Sub Stat\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Pirate_Shoes\",\"Job\":\"Pirate\",\"Set\":\"Absolab\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Pirate_Gloves\",\"Job\":\"Pirate\",\"Set\":\"Absolab\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":160,\"Main Stat\":20,\"Sub Stat\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Pirate_Cape\",\"Job\":\"Pirate\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":160,\"Main Stat\":15,\"Sub Stat\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Absolab_Pirate_Shoulder\",\"Job\":\"Pirate\",\"Set\":\"Absolab\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":160,\"Main Stat\":14,\"Sub Stat\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Pirate_Hat\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":200,\"Main Stat\":45,\"Sub Stat\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Pirate_Shoes\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Pirate_Gloves\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":200,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Pirate_Cape\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Arcane_Pirate_Shoulder\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":200,\"Main Stat\":35,\"Sub Stat\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Pirate_Hat\",\"Job\":\"Pirate\",\"Set\":\"Eternal\",\"Type\":\"Hat\",\"Sub-Type\":\"Hat\",\"Level\":250,\"Main Stat\":80,\"Sub Stat\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":\"\",\"IED\":15,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Pirate_Shirt\",\"Job\":\"Pirate\",\"Set\":\"Eternal\",\"Type\":\"Top\",\"Sub-Type\":\"Top\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Pirate_Pants\",\"Job\":\"Pirate\",\"Set\":\"Eternal\",\"Type\":\"Bottom\",\"Sub-Type\":\"Bottom\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Pirate_Shoes\",\"Job\":\"Pirate\",\"Set\":\"Eternal\",\"Type\":\"Shoes\",\"Sub-Type\":\"Shoes\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Pirate_Gloves\",\"Job\":\"Pirate\",\"Set\":\"Eternal\",\"Type\":\"Gloves\",\"Sub-Type\":\"Gloves\",\"Level\":250,\"Main Stat\":55,\"Sub Stat\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Pirate_Cape\",\"Job\":\"Pirate\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Cape\",\"Level\":250,\"Main Stat\":50,\"Sub Stat\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Eternal_Pirate_Shoulder\",\"Job\":\"Pirate\",\"Set\":\"Eternal\",\"Type\":\"Cape/Belt/Shoulder\",\"Sub-Type\":\"Shoulder\",\"Level\":250,\"Main Stat\":51,\"Sub Stat\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":28,\"M.ATK\":\"\",\"IED\":\"\",\"Boss Damage\":\"\",\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Knuckle\",\"Job\":\"Pirate\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Knuckle\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":128,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Gun\",\"Job\":\"Pirate\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Gun\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":125,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Hand_Cannon\",\"Job\":\"Pirate\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Hand Cannon\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":175,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Fafnir_Soul_Shooter\",\"Job\":\"Pirate\",\"Set\":\"CRA\",\"Type\":\"Weapon\",\"Sub-Type\":\"Soul Shooter\",\"Level\":150,\"Main Stat\":40,\"Sub Stat\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":128,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Knuckle\",\"Job\":\"Pirate\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Knuckle\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":154,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Gun\",\"Job\":\"Pirate\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Gun\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":150,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Hand_Cannon\",\"Job\":\"Pirate\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Hand Cannon\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":210,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Absolab_Soul_Shooter\",\"Job\":\"Pirate\",\"Set\":\"Absolab\",\"Type\":\"Weapon\",\"Sub-Type\":\"Soul Shooter\",\"Level\":160,\"Main Stat\":60,\"Sub Stat\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":154,\"M.ATK\":\"\",\"IED\":10,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Knuckle\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Knuckle\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":221,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Gun\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Gun\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":216,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Hand_Cannon\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Hand Cannon\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":302,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Arcane_Soul_Shooter\",\"Job\":\"Pirate\",\"Set\":\"Arcane\",\"Type\":\"Weapon\",\"Sub-Type\":\"Soul Shooter\",\"Level\":200,\"Main Stat\":100,\"Sub Stat\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":221,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Knuckle\",\"Job\":\"Pirate\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Knuckle\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":255,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Gun\",\"Job\":\"Pirate\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Gun\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":249,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Hand_Cannon\",\"Job\":\"Pirate\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Hand Cannon\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":348,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"},{\"Item Name\":\"Genesis_Soul_Shooter\",\"Job\":\"Pirate\",\"Set\":\"Genesis\",\"Type\":\"Weapon\",\"Sub-Type\":\"Soul Shooter\",\"Level\":200,\"Main Stat\":150,\"Sub Stat\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":255,\"M.ATK\":\"\",\"IED\":20,\"Boss Damage\":30,\"Damage\":\"\"}]"));}}),
"[project]/src/components/ui/itembuttons.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
;
const getJobColor = (job)=>{
    switch(job){
        case 'WARRIOR':
            return '#DD242399';
        case 'MAGE':
            return '#0085F199';
        case 'BOWMAN':
            return '#05980099';
        case 'THIEF':
            return '#DD911999';
        case 'PIRATE':
            return '#591AD499';
        default:
            return '#00000099';
    }
};
const ItemButton = ({ item, onClick })=>{
    const imagePath = `/image/items/${item["Item Name"]}.png`;
    const borderColor = getJobColor(item.Job);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: "p-1 hover:cursor-pointer transition-transform duration-200",
        title: item["Item Name"].replace(/_/g, ' '),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative size-[40px] p-[4px] border rounded-[8px] border-opacity-20 hover:border-[2px] transition-opacity duration-200",
            style: {
                borderColor
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: imagePath,
                alt: item["Item Name"].replace(/_/g, ' '),
                layout: "fill",
                objectFit: "contain",
                className: "p-[4px]"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/itembuttons.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/itembuttons.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/itembuttons.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
};
_c = ItemButton;
const __TURBOPACK__default__export__ = ItemButton;
var _c;
__turbopack_context__.k.register(_c, "ItemButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/itemlist.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/data.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$itembuttons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/itembuttons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const itemList = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2e$json__$28$json$29$__["default"];
const ItemsPage = ({ setSelectedGear })=>{
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [itemType, setItemType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [itemSet, setItemSet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [jobFilter, setJobFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSearch = (e)=>{
        setSearchTerm(e.target.value.toLowerCase());
    };
    const filteredItems = itemList.filter((item)=>{
        const matchesSearch = item["Item Name"].toLowerCase().includes(searchTerm);
        const matchesType = itemType ? item.Type === itemType : true;
        const matchesSet = itemSet ? item.Set === itemSet : true;
        const matchesJob = jobFilter ? item.Job === jobFilter : true;
        return matchesSearch && matchesType && matchesSet && matchesJob;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid mb-4 space-y-4 grid-cols-4 gap-[8px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        type: "text",
                        placeholder: "Search items...",
                        value: searchTerm,
                        onChange: handleSearch
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/itemlist.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: itemType,
                        onValueChange: setItemType,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                className: "w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "All Item Types"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/itemlist.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/itemlist.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                            children: "Item Type"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/itemlist.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            'Weapon',
                                            'Emblem',
                                            'Hat',
                                            'Top',
                                            'Bottom',
                                            'Shoes',
                                            'Gloves',
                                            'Cape/Belt/Shoulder',
                                            'Accessory',
                                            'Pocket',
                                            'Badge',
                                            'Heart'
                                        ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: type,
                                                children: type
                                            }, type, false, {
                                                fileName: "[project]/src/app/components/itemlist.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/itemlist.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/itemlist.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/itemlist.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: itemSet,
                        onValueChange: setItemSet,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                className: "w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "All Sets"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/itemlist.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/itemlist.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                            children: "Item Set"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/itemlist.tsx",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            'CRA',
                                            'Arcane',
                                            'Eternal',
                                            'Genesis',
                                            'Boss',
                                            'Dawn',
                                            'Reinforced',
                                            'Superior',
                                            'Pitch'
                                        ].map((set)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: set,
                                                children: set
                                            }, set, false, {
                                                fileName: "[project]/src/app/components/itemlist.tsx",
                                                lineNumber: 83,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/itemlist.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/itemlist.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/itemlist.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: jobFilter,
                        onValueChange: setJobFilter,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                className: "w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                    placeholder: "All Jobs"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/itemlist.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/itemlist.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                            children: "Job"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/itemlist.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            'Warrior',
                                            'Mage',
                                            'Bowman',
                                            'Thief',
                                            'Pirate'
                                        ].map((job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: job,
                                                children: job
                                            }, job, false, {
                                                fileName: "[project]/src/app/components/itemlist.tsx",
                                                lineNumber: 100,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/itemlist.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/itemlist.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/itemlist.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/itemlist.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-14 overflow-y-auto h-full w-full",
                children: filteredItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$itembuttons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        item: item,
                        onClick: ()=>setSelectedGear(item)
                    }, item["Item Name"], false, {
                        fileName: "[project]/src/app/components/itemlist.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/components/itemlist.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/itemlist.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
};
_s(ItemsPage, "4BlJhFtVgz96Z6JRmaLgAve4L1g=");
_c = ItemsPage;
const __TURBOPACK__default__export__ = ItemsPage;
var _c;
__turbopack_context__.k.register(_c, "ItemsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/gearcalc.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GearCalculator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$starforce$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/starforce.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$cube$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/cube.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$itemlist$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/itemlist.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function GearCalculator() {
    _s();
    const [selectedGear, setSelectedGear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    console.log(selectedGear);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col w-[1440px] h-[924px] py-[32px] gap-[32px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-[4px] h-[64px] w-full justify-center items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "image/geardiff.svg",
                        width: 28,
                        height: 32,
                        alt: "geardiff"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/gearcalc.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "",
                        children: "Gear Diff"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/gearcalc.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/gearcalc.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex grow h-full gap-[32px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col w-full gap-[32px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full h-[640px] overflow-hidden bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$itemlist$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    setSelectedGear: setSelectedGear
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/gearcalc.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/gearcalc.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full gap-[32px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$starforce$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            selectedGear: selectedGear
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/gearcalc.tsx",
                                            lineNumber: 26,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/gearcalc.tsx",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$cube$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            selectedGear: selectedGear
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/gearcalc.tsx",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/gearcalc.tsx",
                                        lineNumber: 28,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/gearcalc.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {}, void 0, false, {
                                fileName: "[project]/src/app/components/gearcalc.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/gearcalc.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full h-full bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/gearcalc.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/gearcalc.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/gearcalc.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(GearCalculator, "a/+xrqXugboedCckZ4xItF9v2mI=");
_c = GearCalculator;
var _c;
__turbopack_context__.k.register(_c, "GearCalculator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_9cc86bc5._.js.map