export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Overview',
      url: '/dashboard',
      icon: 'icon-puzzle',
    },
    {
      name: 'My Patients',
      url: '/patients',
      icon: 'icon-star',
    },
    {
      name: 'Add Patients',
      url: '/addPatients',
      icon: 'icon-calculator',
    },
    {
      divider: true
    }
  ]
};
