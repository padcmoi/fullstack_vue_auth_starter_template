/**
 * Paramètre les classes de la balise <BODY>,
 * applique une transition à la feuille de Style de la balise <BODY>,
 * l'effet transition est par défaut désactivé
 *
 * @param {Boolean} enable
 * @param {Boolean} addTransition
 *
 * @void
 */
function changeBody(enable, addTransition = false) {
  const className = enable ? 'text-light bg-night' : 'text-dark bg-light'

  if (addTransition) {
    document.body.style = 'transition: .5s;'
  }
  document.body.className = className
}

export default {
  namespaced: true,
  state: () => ({
    addTransition: false, // deviendra vrai à la fin de l'execution de l'action init

    displayNight: {
      enable: true,
      icon: 'sun',
      iconColor: 'icon-night-sun',
    },
  }),
  getters: {
    displayNight(state) {
      const enable = state.displayNight.enable

      return {
        enable,
        background: enable ? 'bg-night' : 'bg-light',
        background_2: enable ? 'bg-night' : 'bg-light2',
        background_3: enable ? 'bg-light' : 'bg-primary',
        color: enable ? 'text-night' : 'text-dark',
        color_2: enable ? 'text-night' : 'text-dark',
        border: enable ? 'border-light' : 'border-dark',
        border_2: enable ? 'border-light' : 'border-primary',
        border_3: enable ? 'border-primary' : 'border-primary',
        link: enable ? 'text-night' : 'text-primary',
        variant: enable ? 'light' : 'dark',
        variant_2: enable ? 'secondary' : 'primary',
        variant_3: enable ? 'night' : 'dark',
        variant_4: enable ? 'outline-light' : 'primary',
      }
    },
  },
  mutations: {
    addTransition(state) {
      state.addTransition = true
    },

    switchDisplay(state, payload) {
      const enable = payload

      changeBody(enable, state.addTransition)

      state.displayNight.icon = !enable ? 'sun' : 'moon'
      state.displayNight.iconColor = !enable ? 'text-warning' : 'text-light'
    },
  },
  actions: {
    /**
     * Au lancement de l'application
     */
    init({ state, commit }) {
      // On applique le dernier affichage jour/nuit au démarrage
      const enable = localStorage.getItem('displayNight') === '1' ? false : true
      state.displayNight.enable = enable
      commit('switchDisplay', state.displayNight.enable)
      // On applique le dernier affichage jour/nuit au démarrage

      // On déclare l'application comme étant lancé
      commit('addTransition')
    },

    /**
     * Commute l'affichage jour/nuit
     */
    switch_display({ state, commit }) {
      state.displayNight.enable = !state.displayNight.enable
      localStorage.setItem(
        'displayNight',
        state.displayNight.enable ? '0' : '1'
      )
      commit('switchDisplay', state.displayNight.enable)
    },
  },
}
