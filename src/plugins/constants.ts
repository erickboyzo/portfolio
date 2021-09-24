const Constants = {
  install(Vue:any) {
    Vue.prototype.$Constants = {
      APP_NAME: 'Erick Boyzo',
      ABOUT_ME_TITLES: ['Front-End Developer.', 'UI Developer.', 'Full Stack Developer.'],
      MESSAGE_SUCCESS: '<strong>Message Delivered!</strong> Thank you for contacting me, I will respond back as soon as possible.',
      CONTACT_ME: 'Contact Me',
      VIEW_PROJECTS: 'View Projects',
      PROJECTS: 'Projects & Skills',
      ABOUT_PERSONAL_DETAILS: 'Personal Details',
      SOCIAL_ICONS: [
        { icon: 'devicon-linkedin-plain', link: 'https://www.linkedin.com/in/erick-boyzo-258023a1' },
        { icon: 'devicon-github-original', link: 'https://github.com/erickboyzo' }],
      ABOUT_ME: 'About Me',
      ABOUT_CONTENT: 'Hello there! I\'m <strong>Erick Boyzo</strong>,\n'
        + '                    <br>\n'
        + '                    <br>\n'
        + '                    Enthusiastic Front-End Developer with a passion for creating engaging and\n'
        + '                    user-friendly web applications that simplify our daily experiences and tasks.\n'
        + '                    <br>\n'
        + '                    <br>\n'
        + '                    While my domain of expertise is Front-End Development,\n'
        + '                    I genuinely enjoy exploring Full-Stack Development,\n'
        + '                    Mobile Application Development, and Automation.\n'
        + '                    It\'s seeing an idea come to fruition or providing a solution to\n'
        + '                    an existing\n'
        + '                    problem, that I appreciate most about software development and what keeps\n'
        + '                    me motivated.\n'
        + '                    <br>\n'
        + '                    <br>\n'
        + '                    Have an idea you want to collaborate on?\n'
        + '                    Want to provide some feedback or just want to say hello?\n'
        + '                    Don\'t be shy, please feel free to send me a message.',
      ABOUT_ICONS: [
        { icon: 'mdi-map-marker', label: 'Residence', value: 'Atlanta, GA, United States' },
        {
          icon: 'mdi-at', label: 'Email', value: 'erickboyzo@gmail.com', link: true,
        },
        { icon: 'mdi-account-details', label: 'Occupation', value: 'Front-End Developer' }],
      TOPIC_ICONS: [
        { icon: 'devicon-angularjs-plain colored', value: ['angular', 'angular8'], experience: 90 },
        { icon: 'devicon-react-original colored', value: ['react'], experience: 80 },
        { icon: 'devicon-android-plain-wordmark colored', value: ['android'], experience: 75 },
        { icon: 'devicon-bootstrap-plain colored', value: ['bootstrap', 'Bootstrap'] },
        { icon: 'devicon-express-original colored', value: ['express'] },
        { icon: 'devicon-firebase-plain colored', value: ['firebase'] },
        { icon: 'devicon-gradle-plain-wordmark colored', value: ['gradle'] },
        { icon: 'devicon-heroku-original-wordmark colored', value: ['heroku'] },
        { icon: 'devicon-html5-plain-wordmark colored', value: ['html5', 'html'], experience: 98 },
        { icon: 'devicon-java-plain-wordmark colored', value: ['java'], experience: 80 },
        { icon: 'devicon-javascript-plain colored', value: ['javascript'], experience: 95 },
        { icon: 'devicon-less-plain-wordmark colored', value: ['less'], experience: 97 },
        { icon: 'devicon-nodejs-plain-wordmark colored', value: ['node', 'nodejs'], experience: 50 },
        { icon: 'devicon-php-plain colored', value: ['php'], experience: 75 },
        { icon: 'devicon-postgresql-plain-wordmark colored', value: ['postgresql'] },
        { icon: 'devicon-mysql-plain colored', value: ['mysql'], experience: 50 },
        { icon: 'devicon-python-plain-wordmark colored', value: ['python'], experience: 75 },
        { icon: 'devicon-rails-plain-wordmark colored', value: ['rails'] },
        { icon: 'devicon-ruby-plain colored', value: ['ruby'], experience: 50 },
        { icon: 'devicon-sass-original colored', value: ['sass'], experience: 97 },
        { icon: 'devicon-typescript-plain colored', value: ['typescript'], experience: 95 },
        { icon: 'devicon-vuejs-plain-wordmark colored', value: ['vue', 'vuejs'], experience: 90 }],
      PROFESSIONAL_SKILLS: [
        { icon: 'mdi-television-guide', label: 'UI Development', experience: 85 },
        { icon: 'mdi-monitor', label: 'Web Application Development', experience: 90 },
        { icon: 'mdi-tablet-cellphone', label: 'Mobile Application Development', experience: 80 },
        { icon: 'mdi-cogs', label: 'Automation', experience: 70 },
      ],
      APP_IMAGES: ['expense-tracker.png', 'brewski-buddy.png', 'atl-transit-buddy.png'],
      DEFAULT_IMAGES: ['dev1.jpg', 'dev2.jpg', 'dev3.png', 'dev4.jpg'],
    };
  },
};

export default Constants;
