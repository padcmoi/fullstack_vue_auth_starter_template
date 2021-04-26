export default {
  methods: {
    /**
     * Convertit une chaine de caractères en caractères spéciaux si celle-ci existe
     * sinon retourne la chaine d'origine peu importe le typage de l'argument.
     *
     * ա զ է ր տ ե ը ի ո պ խ ս դ ֆ ք հ ճ կ լ մ ւ ց գ վ բ ն
     *
     *
     * @param {string} Str
     *
     * @return {string}
     */
    getArmenianAlphabet(Str) {
      if (!Str || typeof Str !== 'string') return Str

      let newStr = ''
      const changeTo = {
        a: 'ա',
        b: 'զ',
        c: 'է',
        d: 'ր',
        e: 'տ',
        f: 'ե',
        g: 'ը',
        h: 'ի',
        i: 'ո',
        j: 'պ',
        k: 'խ',
        l: 'ս',
        m: 'դ',
        n: 'ֆ',
        o: 'ք',
        p: 'հ',
        q: 'ճ',
        r: 'կ',
        s: 'լ',
        t: 'մ',
        u: 'ւ',
        v: 'ց',
        w: 'գ',
        x: 'վ',
        y: 'բ',
        z: 'ն',
      }

      for (let i = 0; i < Str.length; i++) {
        newStr += changeTo.hasOwnProperty(Str[i]) ? changeTo[Str[i]] : Str[i]
      }

      return newStr
    },
  },
}
