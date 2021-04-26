export default {
  methods: {
    /**
     * Convertit une chaine de caractères en caractères spéciaux si celle-ci existe
     * sinon retourne la chaine d'origine peu importe le typage de l'argument.
     *
     * α в c ∂ ε ғ g н ι נ к ℓ м η σ ρ q я s т υ v ω x ү z
     *
     * @param {string} Str
     *
     * @return {string}
     */
    getSeafightAlphabet(Str) {
      if (!Str || typeof Str !== 'string') return Str

      let newStr = ''
      const changeTo = {
        a: 'α',
        b: 'в',
        c: 'c',
        d: '∂',
        e: 'ε',
        f: 'ғ',
        g: 'g',
        h: 'н',
        i: 'ι',
        j: 'נ',
        k: 'к',
        l: 'ℓ',
        m: 'м',
        n: 'η',
        o: 'σ',
        p: 'ρ',
        q: 'q',
        r: 'я',
        s: 's',
        t: 'т',
        u: 'υ',
        v: 'v',
        w: 'ω',
        x: 'x',
        y: 'ү',
        z: 'z',
      }

      for (let i = 0; i < Str.length; i++) {
        newStr += changeTo.hasOwnProperty(Str[i]) ? changeTo[Str[i]] : Str[i]
      }

      return newStr
    },
  },
}
