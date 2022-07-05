export const sidebarData = [
  // {
  //   name: 'sidebar.intro',
  //   routepath: '/Intro',
  //   iconClass: 'fas fa-chalkboard'
  // },
  {
    name: 'Products',
    iconClass: 'fab fa-wpforms',
    child: [
      {
        listname: 'AllProducts',
        routepath: '/Products',
        shortname: 'PR'
      },
      {
        listname: 'Categories',
        routepath: '/Categories',
        shortname: 'PR'
      },
      {
        listname: 'Brands',
        routepath: '/Brands',
        shortname: 'PR'
      },
      { listname: 'Attributes',
      iconClass: "fas fa-users-cog",
      child: [
        {
          listname: 'Colors',
          routepath: '/Colors',
          shortname: 'Attr'
        },
        {
          listname: 'Papers',
          routepath: '/Papers',
          shortname: 'Attr'
        },
        {
          listname: 'Sizes',
          routepath: '/Sizes',
          shortname: 'Attr'
        },
        {
          listname: 'Markers',
          routepath: '/Markers',
          shortname: 'Attr'
        }
      ]
      }
    ]
  },
  // {
  //   name: 'Categories',
  //   routepath: '/Categories',
  //   iconClass: 'fas fa-chalkboard'
  // },
  // {
  //   name: 'Brands',
  //   routepath: '/Brands',
  //   iconClass: 'fas fa-chalkboard'
  // },
  // {
  //   name: 'Colors',
  //   routepath: '/Colors',
  //   iconClass: 'fas fa-chalkboard'
  // }
  
];




// Comments:::::::

//  If you want one level child then look below example

/*
  {
    name: 'sidebar.forms',
    iconClass: 'fab fa-wpforms',
    child: [
      {
        listname: 'sidebar.regularforms',
        routepath: '/regularform',
        shortname: 'RF'
      }
    ]
  }
*/

//  If you want Second level child then look below example

/*
   {
      name: 'sidebar.pages',
      iconClass: 'fas fa-print',
      child: [
        {
          listname: 'sidebar.authentication',
          iconClass: 'fas fa-user',
          child: [
            {
              listname: 'sidebar.login',
              routepath: '/login',
              shortname: 'L'
            },
          ]
        }
      ]
    }
*/

export const HorizontalSidebarData = [
  {
      name: 'sidebar.intro',
      routepath: '/Intro',
      iconClass: 'fas fa-chalkboard'
  },
];

// ### For Horizontal sidebar

//     <!-- Basics -->
//         {
//             name: "sidebar.single",
//             iconClass: "fab fa-stripe-s",
//             routepath: "/single"
//         }
//     <!-- One Level -->
//         {
//             name: "sidebar.onelevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     routepath: "/ex",
//                 }
//             ]
//         }
//     <!-- Second level -->
//         {
//             name: "sidebar.secondlevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     iconClass: "fas fa-plus",
//                     child: [
//                         {
//                             name: "sidebar.example1",
//                             routepath: "/ex1",
//                         },
//                         {
//                             name: "sidebar.example2",
//                             routepath: "/ex2",
//                         }
//                     ]
//                 }
//             ]
//         }