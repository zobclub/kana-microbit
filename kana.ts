/**
* KANA blocks
*/
enum DirEnum {
    //% block="horizontal"
    Horizontal,
    //% block="vertical"
    Vertical,
    //% block="none"
    None
}

//% weight=70 color=#1eb0f0 icon="\u3041" block="KANA"
namespace kana {

    //% shim=kana::getAlph
    function getAlph(n: number): number {
        return 0;
    }

    //% shim=kana::getKana
    function getKana(n: number): number {
        return 0;
    }

    //% shim=kana::getHira
    function getHira(n: number): number {
        return 0;
    }

    const alphs1 = "　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀";
    const len = 65;
    const kanas1 = "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホポボマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺーヽヾ";
    const hiras1 = "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぽぼまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ゛゜ゝゞ";

    let im = [0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0
    ];

    let bright = 255;
    let scroll = 200;
    let dir: DirEnum = DirEnum.Horizontal;
    let imm: number;


    function searchKana(s: string) {
        let n = -1;
        imm = 0;

        if (s <= "｀") {
            for (n = 0; n < len; n++) {
                if (s == alphs1.substr(n, 1)) {
                    break;
                }
            }
            if (n == len) {
                return;
            }
            imm = getAlph(n);
        } else if (s <= "ゞ") {
            n = hiras1.indexOf(s);
            if (n == -1) {
                return;
            }
            imm = getHira(n);
        } else if (s <= "ヾ") {
            n = kanas1.indexOf(s);
            if (n == -1) {
                return;
            }
            imm = getKana(n);
        }
    }

    function clrIm() {
        for (let i = 0; i < 25; i++) {
            im[i] = 0;
        }
    }

    function clrIm2() {
        for (let i = 25; i < 55; i++) {
            im[i] = 0;
        }
    }

    function setIm() {
        let d = imm;
        let mask = 0x1000000;
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                im[x * 5 + y] = (d & mask ? bright : 0);
                mask >>= 1;
            }
        }
    }

    function setImH() {
        let of = 25;
        let x: number;
        let y: number;
        let d = imm;
        let mask = 0x1000000;
        for (y = 0; y < 5; y++) {
            im[y + of] = 0;
        }
        for (x = 1; x < 6; x++) {
            for (y = 0; y < 5; y++) {
                im[x * 5 + y + of] = (d & mask ? bright : 0);
                mask >>= 1;
            }
        }
    }

    function setImV() {
        let of = 25;
        let d = imm;
        let mask = 0x1000000;
        for (let x = 0; x < 5; x++) {
            im[x * 6 + of] = 0;
            for (let y = 1; y < 6; y++) {
                im[x * 6 + y + of] = (d & mask ? bright : 0);
                mask >>= 1;
            }
        }
    }

    function setKana(): void {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                led.plotBrightness(x, y, im[x * 5 + y]);
            }
        }
    }

    function shiftLeftIm() {
        for (let i = 0; i < 50; i++) {
            im[i] = im[i + 5];
        }
    }

    function shiftUpIm() {
        let x: number;
        let y: number;
        let of = 25;
        for (y = 0; y < 4; y++) {
            for (x = 0; x < 5; x++) {
                im[x * 5 + y] = im[x * 5 + y + 1];
            }
        }
        for (x = 0; x < 5; x++) {
            im[x * 5 + 4] = im[x * 6 + of];
        }
        for (y = 0; y < 5; y++) {
            for (x = 0; x < 5; x++) {
                im[x * 6 + y + of] = im[x * 6 + y + 1 + of];
            }
        }
    }

    function mojiScroll() {
        let n = 6;
        while (n > 0) {
            if (dir == DirEnum.Horizontal) {
                shiftLeftIm();
            } else {
                shiftUpIm();
            }
            setKana();
            basic.pause(scroll);
            n -= 1;
        }
    }

   /**
     * Set scroll time
     * @param t scroll time, eg: 200
     * @param d direction parameter, eg: DirNum.Horizontal
     */
    //% blockId=set_scrolltime block="set scroll %t %d"
    //% expandableArgumentMode="toggle"
    export function setScroll(t: number, d:DirEnum) {
        scroll = t;
        dir = d;
    }

    /**
     * Set bright
     * @param b number of bright, eg: 128
     */
    //% blockId=set_bright block="set bright %b"
    export function setBright(b: number) {
        if (b <= 255 && b > 0)
            bright = b;
    }

    /**
     * Display KANA
     * @param s Display kana string here, eg: ""
     */
    //% blockId=show_kana block="show KANA %s"
    export function showKana(s: string) {
        let c: string;
        if (s.length == 1) {
            searchKana(s.substr(0, 1));
            setIm();
            setKana();
            return;
        } else {
            clrIm();
            if (dir == DirEnum.Horizontal) {
                for (let i = 0; i < s.length; i++) {
                    searchKana(s.substr(i, 1));
                    setImH();
                    mojiScroll();
                }
                clrIm2();
                mojiScroll();
            } else if (dir == DirEnum.None) {
                for (let i = 0; i < s.length; i++) {
                    searchKana(s.substr(i, 1));
                    setIm();
                    setKana();
                    basic.pause(scroll * 3);
                }
                clrIm();
                setKana();
            } else if (dir == DirEnum.Vertical) {
                for (let i = 0; i < s.length; i++) {
                    for (let j = 25; j < 30; j++) { im[j] = 0; }
                    searchKana(s.substr(i, 1));
                    setImV();
                    mojiScroll();
                }
                clrIm2();
                mojiScroll();
            }
        }
    }
}
