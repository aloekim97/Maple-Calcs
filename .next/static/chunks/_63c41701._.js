(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_63c41701._.js", {

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
function StarForce() {
    _s();
    const [inputs, setInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        itemLevel: '',
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
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        children: "Potential Calculator"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                defaultChecked: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/starforce.tsx",
                        lineNumber: 70,
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
                                            lineNumber: 88,
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
                                                        lineNumber: 93,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                                children: "MVP Discount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: "none",
                                                                children: "None"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: "silver",
                                                                children: "Silver"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: "gold",
                                                                children: "Gold"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: "diamond",
                                                                children: "Diamond"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                                lineNumber: 101,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/starforce.tsx",
                                            lineNumber: 89,
                                            columnNumber: 14
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/starforce.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 86,
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
                                                lineNumber: 109,
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
                                                lineNumber: 110,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "p3",
                                                children: "End Star"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 119,
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
                                                lineNumber: 120,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/starforce.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/starforce.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-[1px] rounded-full bg-black opacity-20"
            }, void 0, false, {
                fileName: "[project]/src/app/components/starforce.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[16px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-[16px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "airplane-mode",
                                children: "Events"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 135,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[8px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: "airplane-mode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "airplane-mode",
                                        children: "Star Catching"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-[8px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: "airplane-mode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "airplane-mode",
                                        children: "Safeguarding"
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
                                        id: "airplane-mode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "airplane-mode",
                                        children: "30% off"
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
                                        id: "airplane-mode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 149,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "airplane-mode",
                                        children: "-30% booms <21"
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
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/starforce.tsx",
                        lineNumber: 134,
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
                                lineNumber: 156,
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
                                                    lineNumber: 160,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 159,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.averageCost
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Average Booms:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 165,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.averageBooms
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Lucky Cost:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 171,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.luckyCost
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Unlucky Cost:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/starforce.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.unluckyCost
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 157,
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
                                        lineNumber: 185,
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
                                                            lineNumber: 189,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "ATK: ",
                                                            results.stats.finalStats.att
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "STAT: ",
                                                            results.stats.finalStats.stat
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: "Difference:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/starforce.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "ATK: +",
                                                            results.stats.difference.att
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "STAT: +",
                                                            results.stats.difference.stat
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/starforce.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/starforce.tsx",
                                                lineNumber: 194,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/starforce.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/starforce.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/starforce.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/starforce.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/starforce.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(StarForce, "KRMTVKie4UiGoCy0lGAh9DLyxIs=");
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
function cubeCombo(goal, lPrime, uPrime) {
    const combinations = [];
    const taggedLPrime = lPrime.map((value)=>`${value} (lPrime)`);
    const taggedUPrime = uPrime.map((value)=>`${value} (uPrime)`);
    const firstValues = taggedLPrime;
    const validValues = [
        ...taggedLPrime,
        ...taggedUPrime
    ];
    for (const value1 of firstValues){
        for (const value2 of validValues){
            for (const value3 of validValues){
                const num1 = parseFloat(value1);
                const num2 = parseFloat(value2);
                const num3 = parseFloat(value3);
                if (num1 + num2 + num3 >= goal) {
                    combinations.push({
                        line1: value1,
                        line2: value2,
                        line3: value3
                    });
                }
            }
        }
    }
    return combinations;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/cube/potlines.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ITEM_PROBABILITIES": (()=>ITEM_PROBABILITIES),
    "WSE_PROBABILITIES": (()=>WSE_PROBABILITIES)
});
const WSE_PROBABILITIES = {
    weapon: {
        Boss30: 6.66,
        Boss35: 9.756,
        Boss40: 4.878,
        ied30: 6.66,
        ied35: 4.878,
        ied40: 4.878,
        att9: 6.66,
        att12: 4.878
    },
    emblem: {
        ied30: 7.5,
        ied35: 5.714,
        ied40: 5.714,
        att9: 7.5,
        att12: 5.714
    },
    secondary: {
        Boss30: 5.882,
        Boss35: 8.51,
        Boss40: 4.255,
        ied30: 5.882,
        ied35: 4.255,
        ied40: 4.255,
        att9: 5.882,
        att12: 4.255
    }
};
const ITEM_PROBABILITIES = {
    hat: {
        stat: {
            statPrime: 9.76,
            allPrime: 7.32,
            statNonPrime: 9.61,
            allNonPrime: 7.69
        },
        cooldown: {
            1: 7.32,
            2: 4.88
        }
    },
    top: {
        stat: {
            statPrime: 10.3,
            allPrime: 7.69,
            statNonPrime: 8.06,
            allNonPrime: 6.45
        }
    },
    pants: {
        stat: {
            statPrime: 12.1,
            allPrime: 9.09,
            statNonPrime: 9.62,
            allNonPrime: 7.69
        }
    },
    glove: {
        stat: {
            statPrime: 10,
            allPrime: 7.5,
            statNonPrime: 8.9,
            allNonPrime: 7.14
        },
        critdamage: {
            1: 10
        }
    },
    shoes: {
        stat: {
            statPrime: 11.11,
            allPrime: 8.33,
            statNonPrime: 9.61,
            allNonPrime: 7.69
        }
    },
    //Cape, belt, shoulder
    cape: {
        stat: {
            statPrime: 12.12,
            allPrime: 9.09,
            statNonPrime: 10.41,
            allNonPrime: 8.33
        }
    },
    accessory: {
        stat: {
            statPrime: 10.25,
            allPrime: 7.69,
            statNonPrime: 12.48,
            allNonPrime: 10
        },
        dropmeso: {
            1: 7.69
        }
    },
    //heart and badge
    heart: {
        stat: {
            statPrime: 14.81,
            allPrime: 11.11,
            statNonPrime: 12.48,
            allNonPrime: 33.33
        }
    },
    weapon: {
        stat: {
            statPrime: 14.81,
            allPrime: 11.11,
            statNonPrime: 12.48,
            allNonPrime: 33.33
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/formulas/cube/cubeprob.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CUBE_PROBABILITIES": (()=>CUBE_PROBABILITIES),
    "default": (()=>findComboProb)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$potlines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/cube/potlines.ts [app-client] (ecmascript)");
;
const CUBE_PROBABILITIES = {
    black: {
        line1: 1.0,
        line2: 0.2,
        line3: 0.05
    },
    red: {
        line1: 1.0,
        line2: 0.1,
        line3: 0.01
    }
};
function findComboProb(combinations, cubeType, itemType, potentialType) {
    const cubeProb = CUBE_PROBABILITIES[cubeType];
    const itemProb = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$potlines$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ITEM_PROBABILITIES"][itemType][potentialType];
    let totalProbability = 0;
    for (const comb of combinations){
        const { line1, line2, line3 } = comb;
        // Parse values and prime status
        const num1 = parseFloat(line1);
        const num2 = parseFloat(line2);
        const num3 = parseFloat(line3);
        // Line1 is always prime
        const isLine2Prime = line2.includes('lPrime') || line2.includes('uPrime');
        const isLine3Prime = line3.includes('lPrime') || line3.includes('uPrime');
        // LINE 1 Probability (always prime)
        const line1Prob = num1 === 9 || num1 === 12 || num1 === 13 || num1 === 10 ? itemProb.allPrime : itemProb.statPrime;
        // LINE 2 Probability
        let line2Prob = 0;
        if (isLine2Prime) {
            const primeProb = cubeProb.line2;
            const valueProb = num2 === 9 || num2 === 12 || num2 === 13 || num2 === 10 ? itemProb.allPrime : itemProb.statPrime;
            line2Prob = primeProb * valueProb;
        } else {
            line2Prob = (1 - cubeProb.line2) * (num2 === 9 || num2 === 12 || num2 === 13 || num2 === 10 ? itemProb.allNonPrime : itemProb.statNonPrime);
        }
        // LINE 3 Probability
        let line3Prob = 0;
        if (isLine3Prime) {
            const primeProb = cubeProb.line3;
            const valueProb = num3 === 9 || num3 === 12 || num3 === 13 || num3 === 10 ? itemProb.allPrime : itemProb.statPrime;
            line3Prob = primeProb * valueProb;
        } else {
            line3Prob = (1 - cubeProb.line3) * (num3 === 9 || num3 === 12 || num3 === 13 || num3 === 10 ? itemProb.allNonPrime : itemProb.statNonPrime);
        }
        const comboProb = line1Prob * line2Prob * line3Prob;
        totalProbability += comboProb;
    }
    console.log(`Total probability: ${totalProbability}`);
    return totalProbability > 0 ? 1 / totalProbability : Infinity;
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
    "potCalc": (()=>potCalc)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$cubecombo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/cube/cubecombo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$cubeprob$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/cube/cubeprob.ts [app-client] (ecmascript)");
;
;
const CUBE_PROBABILITIES = {
    black: {
        line1: 1.0,
        line2: 0.2,
        line3: 0.05
    },
    red: {
        line1: 1.0,
        line2: 0.1,
        line3: 0.01
    }
};
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
        36
    ],
    cooldown: [
        1,
        2,
        3,
        4,
        5,
        6
    ],
    critDamage: [
        8,
        16,
        24
    ],
    cooldownStat: [
        1,
        2,
        3,
        4
    ].concat([
        6,
        7,
        9,
        10,
        12,
        13
    ])
};
function potCalc(itemType, itemLevel, potentialType, goal, cubeType) {
    const { lPrime, uPrime } = itemLevel <= 150 ? {
        lPrime: [
            12,
            9
        ],
        uPrime: [
            9,
            6
        ]
    } : {
        lPrime: [
            13,
            10
        ],
        uPrime: [
            10,
            7
        ]
    };
    const validTargets = VALID_TARGETS_BY_POTENTIAL_TYPE[potentialType];
    const cost = CUBE_COST[cubeType];
    if (!validTargets.includes(goal)) {
        console.log(`Invalid goal. Valid targets for potential type ${potentialType} are: ${validTargets.join(', ')}`);
        return;
    }
    const goalIndex = validTargets.indexOf(goal);
    if (goalIndex === -1) {
        console.log(`Goal ${goal} is not in valid targets.`);
        return;
    }
    const targetsFromGoal = validTargets.slice(goalIndex);
    const validCombinations = [];
    for (const target of targetsFromGoal){
        const combinations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$cubecombo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(target, lPrime, uPrime);
        validCombinations.push(...combinations);
    }
    const averageTry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$cube$2f$cubeprob$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(validCombinations, cubeType, itemType, potentialType);
    const totalProbability = 1 / averageTry; // Calculate total probability
    const totalCost = averageTry * cost;
    // Format the total cost with commas
    const formattedCost = totalCost.toLocaleString();
    return {
        averageCost: formattedCost,
        totalProbability,
        averageTry,
        combinations: validCombinations
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/components/pots.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Cube)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$potentialcalc$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/formulas/potentialcalc.ts [app-client] (ecmascript)");
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
function Cube() {
    _s();
    const [inputs, setInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        itemType: 'hat',
        potentialType: 'stat',
        goal: '30',
        cubeType: 'black',
        itemLevel: ''
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
        const goalNum = Number(inputs.goal);
        if (!itemLevelNum || isNaN(goalNum)) {
            alert('Please fill all fields');
            return;
        }
        const potentialResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$formulas$2f$potentialcalc$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["potCalc"])(inputs.itemType, itemLevelNum, inputs.potentialType, goalNum, inputs.cubeType);
        setResults(potentialResult);
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
                                src: "image/Cube_Icon.svg",
                                width: 14,
                                height: 16,
                                alt: "star"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                children: "Potential Calculator"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/pots.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                        defaultChecked: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/pots.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/pots.tsx",
                lineNumber: 60,
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
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 78,
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
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 83,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                            children: "Cube Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "rare",
                                                            children: "Rare"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 89,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "epic",
                                                            children: "Epic"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 90,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "unique",
                                                            children: "Unique"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 91,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "legendary",
                                                            children: "Legendary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 92,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 86,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "p3",
                                        children: "Desired Tier"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 98,
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
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 103,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                            children: "Cube Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 108,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "rare",
                                                            children: "Rare"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 109,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "epic",
                                                            children: "Epic"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "unique",
                                                            children: "Unique"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "legendary",
                                                            children: "Legendary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/pots.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/pots.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p3",
                                children: "Cube Type"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 119,
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
                                            fileName: "[project]/src/app/components/pots.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                    children: "Cube Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 16
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "black",
                                                    children: "Black Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "red",
                                                    children: "Red Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/pots.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/pots.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p3",
                                children: "Line 1"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 137,
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
                                            fileName: "[project]/src/app/components/pots.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                    children: "Cube Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 16
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "black",
                                                    children: "Black Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "red",
                                                    children: "Red Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/pots.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/pots.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p3",
                                children: "Line 2"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 155,
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
                                            fileName: "[project]/src/app/components/pots.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                    children: "Cube Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 16
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "black",
                                                    children: "Black Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "red",
                                                    children: "Red Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/pots.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/pots.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p3",
                                children: "Line 3"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 173,
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
                                            fileName: "[project]/src/app/components/pots.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectGroup"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectLabel"], {
                                                    children: "Line 3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 16
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "black",
                                                    children: "Black Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "red",
                                                    children: "Red Cube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/pots.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/pots.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-medium text-lg",
                                children: "Potential Results"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 193,
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
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 196,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    results.averageCost,
                                                    " mesos"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Success Chance:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 202,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    (results.totalProbability * 100).toFixed(6),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 205,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Average Attempts:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/pots.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: results.averageTry.toFixed(1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 211,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-medium",
                                        children: "Valid Combinations"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 216,
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
                                                fileName: "[project]/src/app/components/pots.tsx",
                                                lineNumber: 219,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/pots.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/pots.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/pots.tsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/pots.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/pots.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(Cube, "YRNsi+hxTsSiYYkR57+BtFdsHig=");
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
__turbopack_context__.v(JSON.parse("[{\"Item Name\":\"Royal_Warrior_Hat\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":360,\"MP\":360,\"ATK\":2,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"EagleEye_Warrior_Shirt\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Trixter_Warrior_Pants\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Warrior_Shoes\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Warrior_Gloves\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Warrior_Cape\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":160,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Warrior_Shoulder\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":160,\"MAIN STAT\":14,\"SUB STAT\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Warrior_Hat\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":200,\"MAIN STAT\":45,\"SUB STAT\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Warrior_Shoes\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Warrior_Gloves\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Warrior_Cape\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Warrior_Shoulder\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Warrior_Hat\",\"Job\":\"WARRIOR\",\"Set\":\"ETERNAL\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":250,\"MAIN STAT\":80,\"SUB STAT\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":\"\",\"IED\":15,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Warrior_Shirt\",\"Job\":\"WARRIOR\",\"Set\":\"ETERNAL\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Warrior_Pants\",\"Job\":\"WARRIOR\",\"Set\":\"ETERNAL\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Warrior_Shoes\",\"Job\":\"WARRIOR\",\"Set\":\"ETERNAL\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Warrior_Gloves\",\"Job\":\"WARRIOR\",\"Set\":\"ETERNAL\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Warrior_Cape\",\"Job\":\"WARRIOR\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Warrior_Shoulder\",\"Job\":\"WARRIOR\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":250,\"MAIN STAT\":51,\"SUB STAT\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":28,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Royal_Dunwitch_Hat\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":360,\"MP\":360,\"ATK\":\"\",\"M.ATK\":2,\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"EagleEye_Dunwitch_Shirt\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Trixter_Dunwitch_Pants\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Mage_Shoes\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Mage_Gloves\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Mage_Cape\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":160,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Mage_Shoulder\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":160,\"MAIN STAT\":14,\"SUB STAT\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Mage_Hat\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":200,\"MAIN STAT\":45,\"SUB STAT\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":3,\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Mage_Shoes\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":9,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Mage_Gloves\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":9,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Mage_Cape\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":6,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Mage_Shoulder\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":20,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Mage_Hat\",\"Job\":\"MAGE\",\"Set\":\"ETERNAL\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":250,\"MAIN STAT\":80,\"SUB STAT\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":10,\"IED\":15,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Mage_Shirt\",\"Job\":\"MAGE\",\"Set\":\"ETERNAL\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":6,\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Mage_Pants\",\"Job\":\"MAGE\",\"Set\":\"ETERNAL\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":6,\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Mage_Shoes\",\"Job\":\"MAGE\",\"Set\":\"ETERNAL\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":12,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Mage_Gloves\",\"Job\":\"MAGE\",\"Set\":\"ETERNAL\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":12,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Mage_Cape\",\"Job\":\"MAGE\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":9,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Mage_Shoulder\",\"Job\":\"MAGE\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":250,\"MAIN STAT\":51,\"SUB STAT\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":28,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Royal_Ranger_Hat\",\"Job\":\"BOWMAN\",\"Set\":\"CRA\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":360,\"MP\":360,\"ATK\":2,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"EagleEye_Ranger_Shirt\",\"Job\":\"BOWMAN\",\"Set\":\"CRA\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Trixter_Ranger_Pants\",\"Job\":\"BOWMAN\",\"Set\":\"CRA\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Bowman_Shoes\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Bowman_Gloves\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Bowman_Cape\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":160,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Bowman_Shoulder\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":160,\"MAIN STAT\":14,\"SUB STAT\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Bowman_Hat\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":200,\"MAIN STAT\":45,\"SUB STAT\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Bowman_Shoes\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Bowman_Gloves\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"GLOVES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Bowman_Cape\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Bowman_Shoulder\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Bowman_Hat\",\"Job\":\"BOWMAN\",\"Set\":\"ETERNAL\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":250,\"MAIN STAT\":80,\"SUB STAT\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":\"\",\"IED\":15,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Bowman_Shirt\",\"Job\":\"BOWMAN\",\"Set\":\"ETERNAL\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Bowman_Pants\",\"Job\":\"BOWMAN\",\"Set\":\"ETERNAL\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Bowman_Shoes\",\"Job\":\"BOWMAN\",\"Set\":\"ETERNAL\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Bowman_Gloves\",\"Job\":\"BOWMAN\",\"Set\":\"ETERNAL\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Bowman_Cape\",\"Job\":\"BOWMAN\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Bowman_Shoulder\",\"Job\":\"BOWMAN\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":250,\"MAIN STAT\":51,\"SUB STAT\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":28,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Royal_Assassin_Hat\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":360,\"MP\":360,\"ATK\":2,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"EagleEye_Assassin_Shirt\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Trixter_Assassin_Pants\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Thief_Shoes\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Thief_Gloves\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Thief_Cape\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":160,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Thief_Shoulder\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":160,\"MAIN STAT\":14,\"SUB STAT\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Thief_Hat\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":200,\"MAIN STAT\":45,\"SUB STAT\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Thief_Shoes\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Thief_Gloves\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Thief_Cape\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Thief_Shoulder\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Thief_Hat\",\"Job\":\"THIEF\",\"Set\":\"ETERNAL\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":250,\"MAIN STAT\":80,\"SUB STAT\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":\"\",\"IED\":15,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Thief_Shirt\",\"Job\":\"THIEF\",\"Set\":\"ETERNAL\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Thief_Pants\",\"Job\":\"THIEF\",\"Set\":\"ETERNAL\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Thief_Shoes\",\"Job\":\"THIEF\",\"Set\":\"ETERNAL\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Thief_Gloves\",\"Job\":\"THIEF\",\"Set\":\"ETERNAL\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Thief_Cape\",\"Job\":\"THIEF\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Thief_Shoulder\",\"Job\":\"THIEF\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":250,\"MAIN STAT\":51,\"SUB STAT\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":28,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Royal_Wanderer_Hat\",\"Job\":\"PIRATE\",\"Set\":\"CRA\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":360,\"MP\":360,\"ATK\":2,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"EagleEye_Wanderer_Shirt\",\"Job\":\"PIRATE\",\"Set\":\"CRA\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Trixter_Wanderer_Pants\",\"Job\":\"PIRATE\",\"Set\":\"CRA\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":150,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Pirate_Shoes\",\"Job\":\"PIRATE\",\"Set\":\"ABSOLAB\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Pirate_Gloves\",\"Job\":\"PIRATE\",\"Set\":\"ABSOLAB\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Pirate_Cape\",\"Job\":\"PIRATE\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":160,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Pirate_Shoulder\",\"Job\":\"PIRATE\",\"Set\":\"ABSOLAB\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":160,\"MAIN STAT\":14,\"SUB STAT\":14,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Pirate_Hat\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":200,\"MAIN STAT\":45,\"SUB STAT\":45,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Pirate_Shoes\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Pirate_Gloves\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Pirate_Cape\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Pirate_Shoulder\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":200,\"MAIN STAT\":35,\"SUB STAT\":35,\"HP\":\"\",\"MP\":\"\",\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Pirate_Hat\",\"Job\":\"PIRATE\",\"Set\":\"ETERNAL\",\"Type\":\"HAT\",\"Sub-Type\":\"HAT\",\"Level\":250,\"MAIN STAT\":80,\"SUB STAT\":80,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":\"\",\"IED\":15,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Pirate_Shirt\",\"Job\":\"PIRATE\",\"Set\":\"ETERNAL\",\"Type\":\"TOP\",\"Sub-Type\":\"TOP\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Pirate_Pants\",\"Job\":\"PIRATE\",\"Set\":\"ETERNAL\",\"Type\":\"BOTTOM\",\"Sub-Type\":\"BOTTOM\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":\"\",\"IED\":5,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Pirate_Shoes\",\"Job\":\"PIRATE\",\"Set\":\"ETERNAL\",\"Type\":\"SHOES\",\"Sub-Type\":\"SHOES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Pirate_Gloves\",\"Job\":\"PIRATE\",\"Set\":\"ETERNAL\",\"Type\":\"GLOVES\",\"Sub-Type\":\"GLOVES\",\"Level\":250,\"MAIN STAT\":55,\"SUB STAT\":55,\"HP\":\"\",\"MP\":\"\",\"ATK\":12,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Pirate_Cape\",\"Job\":\"PIRATE\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"CAPE\",\"Level\":250,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":\"\",\"MP\":\"\",\"ATK\":9,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Eternal_Pirate_Shoulder\",\"Job\":\"PIRATE\",\"Set\":\"ETERNAL\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":250,\"MAIN STAT\":51,\"SUB STAT\":51,\"HP\":\"\",\"MP\":\"\",\"ATK\":28,\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_One-Handed_Sword\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED SWORD\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Two-Handed_Sword\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED SWORD\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_One-Handed_Axe\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED AXE\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Two-Handed_Axe\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED AXE\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_One-Handed_Blunt_Weapon\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED BLUNT WEAPON\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Two-Handed_Blunt_Weapon\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED BLUENT WEAPON\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Spear\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SPEAR\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Polearm\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"POLEARM\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":153,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Bladecaster\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"BLADECASTER\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Katana\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"KATANA\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Arm_Cannon\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ARM CANNON\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":128,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Desperado\",\"Job\":\"WARRIOR\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DESPERADO\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":\"\",\"HP\":2000,\"MP\":\"\",\"ATK\":171,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Wand\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WAND\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Staff\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"STAFF\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":126,\"M.ATK\":204,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Shining_Rod\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SHINING ROD\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Psy-Limiter\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"PSY-LIMITER\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Fan\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"FAN\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":126,\"M.ATK\":204,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Lucent_Gauntlet\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"LUCENT GAUNTLET\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Memorial_Staff\",\"Job\":\"MAGE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"MEMORIAL STAFF\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":119,\"M.ATK\":201,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Bow\",\"Job\":\"BOWMAN\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"BOW\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Crossbow\",\"Job\":\"BOWMAN\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CROSSBOW\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Dual_Bowguns\",\"Job\":\"BOWMAN\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DUAL BOWGUNS\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Whispershot\",\"Job\":\"BOWMAN\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WHISPERSHOT\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Ancient_Bow\",\"Job\":\"BOWMAN\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ANCIENT BOW\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Dagger\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DAGGER\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Claw\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CLAW\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":86,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Cane\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CANE\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":164,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Chakram\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CHAKRAM\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Whipblade\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WHIPBLADE\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":128,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Chain\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CHAIN\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Ritual_Fan\",\"Job\":\"THIEF\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"RITUAL FAN\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":160,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Knuckle\",\"Job\":\"PIRATE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"KNUCKLE\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":128,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Gun\",\"Job\":\"PIRATE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"GUN\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":125,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Hand_Cannon\",\"Job\":\"PIRATE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"HAND CANNON\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":175,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Fafnir_Soul_Shooter\",\"Job\":\"PIRATE\",\"Set\":\"CRA\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SOUL SHOOTER\",\"Level\":150,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":128,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_One-Handed_Sword\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED SWORD\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Two-Handed_Sword\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED SWORD\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_One-Handed_Axe\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED AXE\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Two-Handed_Axe\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED AXE\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_One-Handed_Blunt_Weapon\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED BLUNT WEAPON\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Two-Handed_Blunt_Weapon\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED BLUENT WEAPON\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Spear\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SPEAR\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Polearm\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"POLEARM\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":184,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Bladecaster\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"BLADECASTER\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Katana\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"KATANA\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Arm_Cannon\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ARM CANNON\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":154,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Desperado\",\"Job\":\"WARRIOR\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DESPERADO\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":\"\",\"HP\":2250,\"MP\":\"\",\"ATK\":205,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Wand\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WAND\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Staff\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"STAFF\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":151,\"M.ATK\":245,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Shining_Rod\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SHINING ROD\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Psy-Limiter\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"PSY-LIMITER\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Fan\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"FAN\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Lucent_Gauntlet\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"LUCENT GAUNTLET\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Memorial_Staff\",\"Job\":\"MAGE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"MEMORIAL STAFF\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":143,\"M.ATK\":241,\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Bow\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"BOW\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Crossbow\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CROSSBOW\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Dual_Bowguns\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DUAL BOWGUNS\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Whispershot\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WHISPERSHOT\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Ancient_Bow\",\"Job\":\"BOWMAN\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ANCIENT BOW\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Dagger\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DAGGER\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Claw\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CLAW\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":103,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Cane\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CANE\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":197,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Chakram\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CHAKRAM\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Whipblade\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WHIPBLADE\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":154,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Chain\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CHAIN\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Ritual_Fan\",\"Job\":\"THIEF\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"RITUAL FAN\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":192,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Knuckle\",\"Job\":\"PIRATE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"KNUCKLE\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":154,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Gun\",\"Job\":\"PIRATE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"GUN\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":150,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Hand_Cannon\",\"Job\":\"PIRATE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"HAND CANNON\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":210,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Absolab_Soul_Shooter\",\"Job\":\"PIRATE\",\"Set\":\"ABSOLAB\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SOUL SHOOTER\",\"Level\":160,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":\"\",\"MP\":\"\",\"ATK\":154,\"M.ATK\":\"\",\"IED\":10,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_One-Handed_Sword\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED SWORD\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Two-Handed_Sword\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED SWORD\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_One-Handed_Axe\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED AXE\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Two-Handed_Axe\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED AXE\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_One-Handed_Blunt_Weapon\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED BLUNT WEAPON\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Two-Handed_Blunt_Weapon\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED BLUENT WEAPON\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Spear\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SPEAR\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Polearm\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"POLEARM\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":264,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Bladecaster\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"BLADECASTER\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Katana\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"KATANA\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Arm_Cannon\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ARM CANNON\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":221,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Desperado\",\"Job\":\"WARRIOR\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DESPERADO\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":\"\",\"HP\":\"\",\"MP\":\"\",\"ATK\":295,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Wand\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WAND\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Staff\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"STAFF\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":218,\"M.ATK\":353,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Shining_Rod\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SHINING ROD\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Psy-Limiter\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"PSY-LIMITER\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Fan\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"FAN\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Lucent_Gauntlet\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"LUCENT GAUNTLET\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Memorial_Staff\",\"Job\":\"MAGE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"MEMORIAL STAFF\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":206,\"M.ATK\":347,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Bow\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"BOW\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Crossbow\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CROSSBOW\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Dual_Bowguns\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DUAL BOWGUNS\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Whispershot\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WHISPERSHOT\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Ancient_Bow\",\"Job\":\"BOWMAN\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ANCIENT BOW\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Dagger\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DAGGER\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Claw\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CLAW\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":149,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Cane\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CANE\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":283,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Chakram\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CHAKRAM\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Whipblade\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WHIPBLADE\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":221,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Chain\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CHAIN\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Ritual_Fan\",\"Job\":\"THIEF\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"RITUAL FAN\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":276,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Knuckle\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"KNUCKLE\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":221,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Gun\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"GUN\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":216,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Hand_Cannon\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"HAND CANNON\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":302,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Arcane_Soul_Shooter\",\"Job\":\"PIRATE\",\"Set\":\"ARCANE\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SOUL SHOOTER\",\"Level\":200,\"MAIN STAT\":100,\"SUB STAT\":100,\"HP\":\"\",\"MP\":\"\",\"ATK\":221,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_One-Handed_Sword\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED SWORD\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Two-Handed_Sword\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED SWORD\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_One-Handed_Axe\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED AXE\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Two-Handed_Axe\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED AXE\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_One-Handed_Blunt_Weapon\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ONE-HANDED BLUNT WEAPON\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Two-Handed_Blunt_Weapon\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"TWO-HANDED BLUENT WEAPON\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Spear\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SPEAR\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Polearm\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"POLEARM\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":304,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Bladecaster\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"BLADECASTER\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Katana\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"KATANA\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Arm_Cannon\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ARM CANNON\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":255,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Desperado\",\"Job\":\"WARRIOR\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DESPERADO\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":\"\",\"HP\":2800,\"MP\":\"\",\"ATK\":340,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Wand\",\"Job\":\"MAGE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WAND\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Staff\",\"Job\":\"MAGE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"STAFF\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":251,\"M.ATK\":406,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Shining_Rod\",\"Job\":\"MAGE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SHINING ROD\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Psy-Limiter\",\"Job\":\"MAGE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"PSY-LIMITER\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Fan\",\"Job\":\"MAGE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"FAN\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Lucent_Gauntlet\",\"Job\":\"MAGE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"LUCENT GAUNTLET\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Memorial_Staff\",\"Job\":\"MAGE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"MEMORIAL STAFF\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":237,\"M.ATK\":400,\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Bow\",\"Job\":\"BOWMAN\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"BOW\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Crossbow\",\"Job\":\"BOWMAN\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CROSSBOW\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Dual_Bowguns\",\"Job\":\"BOWMAN\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DUAL BOWGUNS\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Whispershot\",\"Job\":\"BOWMAN\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WHISPERSHOT\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Ancient_Bow\",\"Job\":\"BOWMAN\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"ANCIENT BOW\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Dagger\",\"Job\":\"THIEF\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"DAGGER\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Claw\",\"Job\":\"THIEF\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CLAW\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":172,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Cane\",\"Job\":\"THIEF\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CANE\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":326,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Chakram\",\"Job\":\"THIEF\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CHAKRAM\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Whipblade\",\"Job\":\"THIEF\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"WHIPBLADE\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":255,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Chain\",\"Job\":\"THIEF\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"CHAIN\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Ritual_Fan\",\"Job\":\"THIEF\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"RITUAL FAN\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":318,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Knuckle\",\"Job\":\"PIRATE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"KNUCKLE\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":255,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Gun\",\"Job\":\"PIRATE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"GUN\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":249,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Hand_Cannon\",\"Job\":\"PIRATE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"HAND CANNON\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":348,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Soul_Shooter\",\"Job\":\"PIRATE\",\"Set\":\"GENESIS\",\"Type\":\"WEAPON\",\"Sub-Type\":\"SOUL SHOOTER\",\"Level\":200,\"MAIN STAT\":150,\"SUB STAT\":150,\"HP\":\"\",\"MP\":\"\",\"ATK\":255,\"M.ATK\":\"\",\"IED\":20,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Condensed_Power_Crystal\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"FACE ACCESSORY\",\"Level\":110,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Aquatic_Letter_Eye_Accessory\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EYE ACCESSORY\",\"Level\":100,\"MAIN STAT\":6,\"SUB STAT\":6,\"HP\":\"\",\"MP\":\"\",\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Black_Bean_Mark\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EYE ACCESSORY\",\"Level\":135,\"MAIN STAT\":7,\"SUB STAT\":7,\"HP\":\"\",\"MP\":\"\",\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Papulatus_Mark\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EYE ACCESSORY\",\"Level\":145,\"MAIN STAT\":8,\"SUB STAT\":8,\"HP\":\"\",\"MP\":\"\",\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Dea_Sidus_Earrings\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EARRINGS\",\"Level\":130,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Will_o'_The_Wisp_Earrings\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EARRINGS\",\"Level\":130,\"MAIN STAT\":7,\"SUB STAT\":7,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Silver_Blossom_Ring\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"RING\",\"Level\":110,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Noble_Ifia's_Ring\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"RING\",\"Level\":120,\"MAIN STAT\":\"\",\"SUB STAT\":\"\",\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Guardian_Angel_Ring\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"RING\",\"Level\":160,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Horntail_Necklace\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"PENDANT\",\"Level\":120,\"MAIN STAT\":7,\"SUB STAT\":7,\"HP\":\"\",\"MP\":\"\",\"ATK\":\"\",\"M.ATK\":\"\",\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Chaos_Horntail_Necklace\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"PENDANT\",\"Level\":120,\"MAIN STAT\":10,\"SUB STAT\":10,\"HP\":\"10%\",\"MP\":\"10%\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Mechanator_Necklace\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"PENDANT\",\"Level\":140,\"MAIN STAT\":10,\"SUB STAT\":10,\"HP\":250,\"MP\":250,\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Dominator_Necklace\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"PENDANT\",\"Level\":130,\"MAIN STAT\":20,\"SUB STAT\":20,\"HP\":\"10%\",\"MP\":\"10%\",\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Golden_Clover_Belt\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"BELT\",\"Level\":140,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":150,\"MP\":150,\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Royal_Black_Metal_Shoulder\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"SHOULDER\",\"Level\":130,\"MAIN STAT\":10,\"SUB STAT\":10,\"HP\":\"\",\"MP\":\"\",\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Enraged_Zakum_Belt\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"BELT\",\"Level\":140,\"MAIN STAT\":18,\"SUB STAT\":18,\"HP\":150,\"MP\":150,\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Stone_Of_Eternal_Life\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"POCKET\",\"Sub-Type\":\"POCKET\",\"Level\":0,\"MAIN STAT\":3,\"SUB STAT\":3,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Pinky_Holy_Cup\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"POCKET\",\"Sub-Type\":\"POCKET\",\"Level\":140,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":50,\"MP\":50,\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Crystal_Ventus_Badge\",\"Job\":\"\",\"Set\":\"BOSS\",\"Type\":\"BADGE\",\"Sub-Type\":\"BADGE\",\"Level\":130,\"MAIN STAT\":10,\"SUB STAT\":10,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Kanna's_Treasure\",\"Job\":\"\",\"Set\":\"\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"RING\",\"Level\":140,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":200,\"MP\":200,\"ATK\":1,\"M.ATK\":1,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Twilight_Mark\",\"Job\":\"\",\"Set\":\"DAWN\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"FACE ACCESSORY\",\"Level\":140,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Estella_Earrings\",\"Job\":\"\",\"Set\":\"DAWN\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EARRINGS\",\"Level\":160,\"MAIN STAT\":7,\"SUB STAT\":7,\"HP\":300,\"MP\":300,\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Dawn_Guardian_Angel_Ring\",\"Job\":\"\",\"Set\":\"DAWN\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"RING\",\"Level\":160,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":200,\"MP\":200,\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Daybreak_Pendant\",\"Job\":\"\",\"Set\":\"DAWN\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"PENDANT\",\"Level\":140,\"MAIN STAT\":8,\"SUB STAT\":8,\"HP\":\"5%\",\"MP\":\"\",\"ATK\":2,\"M.ATK\":2,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Reinforced_Gollux_Earrings\",\"Job\":\"\",\"Set\":\"REINFORCED\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EARRINGS\",\"Level\":140,\"MAIN STAT\":12,\"SUB STAT\":12,\"HP\":150,\"MP\":150,\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Reinforced_Gollux_Ring\",\"Job\":\"\",\"Set\":\"REINFORCED\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"RING\",\"Level\":140,\"MAIN STAT\":8,\"SUB STAT\":8,\"HP\":200,\"MP\":200,\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Reinforced_Gollux_Pendant\",\"Job\":\"\",\"Set\":\"REINFORCED\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"PENDANT\",\"Level\":140,\"MAIN STAT\":23,\"SUB STAT\":23,\"HP\":300,\"MP\":300,\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Reinforced_Gollux_Belt\",\"Job\":\"\",\"Set\":\"REINFORCED\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"BELT\",\"Level\":140,\"MAIN STAT\":30,\"SUB STAT\":30,\"HP\":200,\"MP\":200,\"ATK\":20,\"M.ATK\":20,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Superior_Gollux_Earrings\",\"Job\":\"\",\"Set\":\"SUPERIOR\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EARRINGS\",\"Level\":150,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":150,\"MP\":150,\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Superior_Gollux_Ring\",\"Job\":\"\",\"Set\":\"SUPERIOR\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"RING\",\"Level\":150,\"MAIN STAT\":10,\"SUB STAT\":10,\"HP\":250,\"MP\":250,\"ATK\":8,\"M.ATK\":8,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Superior_Gollux_Pendant\",\"Job\":\"\",\"Set\":\"SUPERIOR\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"PENDANT\",\"Level\":150,\"MAIN STAT\":28,\"SUB STAT\":28,\"HP\":300,\"MP\":300,\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Superior_Gollux_Belt\",\"Job\":\"\",\"Set\":\"SUPERIOR\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"BELT\",\"Level\":150,\"MAIN STAT\":60,\"SUB STAT\":60,\"HP\":200,\"MP\":200,\"ATK\":35,\"M.ATK\":35,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Beserked\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"FACE ACCESSORY\",\"Level\":160,\"MAIN STAT\":10,\"SUB STAT\":10,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Magic_Eyepatch\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EYE ACCESSORY\",\"Level\":160,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Commanding_Force_Earrings\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"EARRINGS\",\"Level\":200,\"MAIN STAT\":7,\"SUB STAT\":7,\"HP\":500,\"MP\":500,\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Endless_Terror\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"RING\",\"Level\":200,\"MAIN STAT\":5,\"SUB STAT\":5,\"HP\":250,\"MP\":250,\"ATK\":4,\"M.ATK\":4,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Source_Of_Suffering\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"ACCESSORY\",\"Sub-Type\":\"PENDANT\",\"Level\":160,\"MAIN STAT\":10,\"SUB STAT\":10,\"HP\":\"5%\",\"MP\":\"\",\"ATK\":3,\"M.ATK\":3,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Dreamy_Belt\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"CAPE/BELT/SHOULDER\",\"Sub-Type\":\"BELT\",\"Level\":200,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":150,\"MP\":150,\"ATK\":6,\"M.ATK\":6,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Cursed_Spellbook\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"POCKET\",\"Sub-Type\":\"POCKET\",\"Level\":160,\"MAIN STAT\":20,\"SUB STAT\":10,\"HP\":100,\"MP\":100,\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Black_Heart\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"HEART\",\"Sub-Type\":\"HEART\",\"Level\":120,\"MAIN STAT\":50,\"SUB STAT\":50,\"HP\":100,\"MP\":\"\",\"ATK\":77,\"M.ATK\":77,\"IED\":30,\"BOSS DAMAGE\":30,\"DAMAGE\":\"\"},{\"Item Name\":\"Total_Control\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"HEART\",\"Sub-Type\":\"HEART\",\"Level\":200,\"MAIN STAT\":25,\"SUB STAT\":25,\"HP\":1250,\"MP\":\"\",\"ATK\":15,\"M.ATK\":15,\"IED\":30,\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Genesis_Badge\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"BADGE\",\"Sub-Type\":\"BADGE\",\"Level\":200,\"MAIN STAT\":15,\"SUB STAT\":15,\"HP\":\"\",\"MP\":\"\",\"ATK\":10,\"M.ATK\":10,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"},{\"Item Name\":\"Mitra's_Rage\",\"Job\":\"\",\"Set\":\"PITCH\",\"Type\":\"EMBLEM\",\"Sub-Type\":\"EMBLEM\",\"Level\":200,\"MAIN STAT\":40,\"SUB STAT\":40,\"HP\":\"\",\"MP\":\"\",\"ATK\":5,\"M.ATK\":5,\"IED\":\"\",\"BOSS DAMAGE\":\"\",\"DAMAGE\":\"\"}]"));}}),
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
const ItemButton = ({ item, onClick })=>{
    const imagePath = `/image/items/${item["Item Name"]}.png`;
    ///image/items/${item["Item Name"]}.png
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: "p-1 hover:scale-105 transition-transform duration-200",
        title: item["Item Name"].replace(/_/g, ' '),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative size-[40px] p-[4px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: imagePath,
                alt: item["Item Name"].replace(/_/g, ' '),
                layout: "fill",
                objectFit: "contain",
                className: "rounded-md"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/itembuttons.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/itembuttons.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/itembuttons.tsx",
        lineNumber: 13,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/public/data.json (json)"); // adjust path to your JSON file
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$itembuttons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/itembuttons.tsx [app-client] (ecmascript)");
;
;
;
// Cast the imported JSON to Item array
const itemList = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$data$2e$json__$28$json$29$__["default"];
const ItemsPage = ()=>{
    const handleItemClick = (itemName)=>{
        console.log('Selected item:', itemName);
    // Add your click handler logic here
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 overflow-auto h-full w-full",
            children: itemList.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$itembuttons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    item: item,
                    onClick: ()=>handleItemClick(item["Item Name"])
                }, item["Item Name"], false, {
                    fileName: "[project]/src/app/components/itemlist.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/app/components/itemlist.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/itemlist.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
};
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$pots$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/pots.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$itemlist$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/itemlist.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function GearCalculator() {
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
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "",
                        children: "Gear Diff"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/gearcalc.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/gearcalc.tsx",
                lineNumber: 11,
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
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$itemlist$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/app/components/gearcalc.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/gearcalc.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex w-full gap-[32px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$starforce$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/src/app/components/gearcalc.tsx",
                                            lineNumber: 27,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/gearcalc.tsx",
                                        lineNumber: 26,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$pots$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/src/app/components/gearcalc.tsx",
                                            lineNumber: 30,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/gearcalc.tsx",
                                        lineNumber: 29,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/gearcalc.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {}, void 0, false, {
                                fileName: "[project]/src/app/components/gearcalc.tsx",
                                lineNumber: 33,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/gearcalc.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full h-full bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/gearcalc.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/gearcalc.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/gearcalc.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = GearCalculator;
var _c;
__turbopack_context__.k.register(_c, "GearCalculator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_63c41701._.js.map