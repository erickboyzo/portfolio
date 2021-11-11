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
      DEV_EXPERIENCE: 'Development Experience',
      TECH_SKILLS: 'Technical Skills',
      SHOW_MORE: 'Show More',
      SHOW_LESS: 'Show Less',
      DESCRIPTION: 'Description',
      PROJECT_TAGS: 'Project Tags',
      VIEW_SOURCE: 'View Source Code',
      GO_TO_APP: 'Go to app',
      SEND_MESSAGE: 'Send Message',
      SOCIAL_ICONS: [
        { icon: 'devicon-linkedin-plain', link: 'https://www.linkedin.com/in/erick-boyzo-258023a1' },
        { icon: 'devicon-github-original', link: 'https://github.com/erickboyzo' }],
      ABOUT_ME: 'About Me',
      ABOUT_CONTENT: 'Hello there! </br></br> I\'m <strong>Erick Boyzo</strong>,\n'
        + 'an enthusiastic Front-End Developer. In my role as a Front-End Developer, I strive to create innovative and engaging web applications that simplify our daily lives.\n'
        + '\n </br> </br>'
        + 'As a hobby, I genuinely enjoy Full-Stack Development, Mobile Application Development, and Automation. My favorite part of software development involves seeing ideas come to life or providing solutions to existing problems.\n'
        + '\n </br> </br>'
        + 'Want to collaborate on an idea? Want to provide feedback? Or just want to say hello? Don\'t be shy, please feel free to message me.',
      ABOUT_ICONS: [
        { icon: 'mdi-map-marker', label: 'Residence', value: 'Atlanta, GA, United States' },
        {
          icon: 'mdi-at', label: 'Email', value: 'erickboyzo@gmail.com', link: true,
        },
        { icon: 'mdi-account-details', label: 'Occupation', value: 'Front-End Developer' }],
      TOPIC_ICONS: [
        { icon: 'devicon-angularjs-plain colored', displayLabel: 'Angular', value: ['angular', 'angular8'], experience: 90 },
        { icon: 'devicon-react-original colored', displayLabel: 'React', value: ['react'], experience: 80 },
        { icon: 'devicon-android-plain-wordmark colored', displayLabel: 'Android', value: ['android'], experience: 75 },
        { icon: 'devicon-bootstrap-plain colored', displayLabel: 'Bootstrap', value: ['bootstrap', 'Bootstrap'] },
        { icon: 'devicon-express-original colored', displayLabel: 'Express', value: ['express'] },
        { icon: 'devicon-firebase-plain colored', displayLabel: 'Firebase', value: ['firebase'] },
        { icon: 'devicon-gradle-plain-wordmark colored', displayLabel: 'Gradle', value: ['gradle'] },
        { icon: 'devicon-heroku-original-wordmark colored', displayLabel: 'Heroku', value: ['heroku'] },
        { icon: 'devicon-html5-plain-wordmark colored', displayLabel: 'HTML5', value: ['html5', 'html'], experience: 95 },
        { icon: 'devicon-java-plain-wordmark colored', displayLabel: 'Java', value: ['java'], experience: 80 },
        { icon: 'devicon-spring-plain colored', displayLabel: 'Spring', value: ['spring'] },
        { icon: 'devicon-javascript-plain colored', displayLabel: 'Javascript', value: ['javascript'], experience: 95 },
        { icon: 'devicon-less-plain-wordmark colored', displayLabel: 'Less', value: ['less'], experience: 95 },
        { icon: 'devicon-nodejs-plain-wordmark colored', displayLabel: 'Node.js', value: ['node', 'nodejs'], experience: 50 },
        { icon: 'devicon-php-plain colored', value: ['php'], displayLabel: 'PHP', experience: 75 },
        { icon: 'devicon-postgresql-plain-wordmark colored', displayLabel: 'PostgreSQL', value: ['postgresql'] },
        { icon: 'devicon-mysql-plain colored', value: ['mysql'], displayLabel: 'MySQL', experience: 50 },
        { icon: 'devicon-python-plain-wordmark colored', displayLabel: 'Python', value: ['python'], experience: 75 },
        { icon: 'devicon-rails-plain-wordmark colored', displayLabel: 'Rails', value: ['rails'] },
        { icon: 'devicon-ruby-plain colored', displayLabel: 'Ruby', value: ['ruby'], experience: 50 },
        { icon: 'devicon-sass-original colored', displayLabel: 'Sass', value: ['sass'], experience: 95 },
        { icon: 'devicon-typescript-plain colored', displayLabel: 'Typescript', value: ['typescript'], experience: 90 },
        { icon: 'devicon-vuejs-plain-wordmark colored', displayLabel: 'Vue', value: ['vue', 'vuejs'], experience: 90 }],
      PROFESSIONAL_SKILLS: [
        { icon: 'mdi-television-guide', label: 'UI Development', experience: 90 },
        { icon: 'mdi-monitor', label: 'Web Application Development', experience: 95 },
        { icon: 'mdi-tablet-cellphone', label: 'Mobile Application Development', experience: 80 },
        { icon: 'mdi-cogs', label: 'Automation', experience: 70 },
      ],
      APP_IMAGES: ['expense-tracker.png', 'brewski-buddy.png', 'atl-transit-buddy.png'],
      DEFAULT_IMAGES: ['dev1.jpg', 'dev2.jpg', 'dev3.png', 'dev4.jpg'],
    };
  },
};

export default Constants;
