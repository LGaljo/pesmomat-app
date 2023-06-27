export default {
  data() {
    return {
      roles: [
        {
          text: "Uporabnik",
          value: "USER"
        },
        {
          text: "Nepotrjen",
          value: "UNAPPROVED"
        },
      ],
    }
  },
  methods: {
    getVariantForRole(role) {
      switch(role) {
        case 'USER':
          return 'info'
        case 'UNAPPROVED':
          return 'secondary'
        default:
          return 'light'
      }
    },
    getNameForRole(role) {
      return this.roles.find(r => r.value === role)?.text
    },
  }
}
