var chuks_project = angular.module('access',["ngRoute","ngCookies","ngMessages", "ngClipboard","ngSanitize","summernote"]);

// Routing starts
chuks_project.config(function($routeProvider,$locationProvider){
 $routeProvider
 .when('/',{
   templateUrl:'dashboard.html',
   controller:'dashboardCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/dashboard',{
   templateUrl:'dashboard.html',
   controller:'dashboardCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/categories',{
   templateUrl:'categories.html',
   controller:'categoriesCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/checkers',{
   templateUrl:'checkers.html',
   controller:'checkersCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/add-checker',{
   templateUrl:'add-checker.html',
   controller:'add-checkerCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/add-user',{
   templateUrl:'add-user.html',
   controller:'add-userCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/all-users',{
   templateUrl:'users.html',
   controller:'all-usersCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/everyone',{
   templateUrl:'everyone.html',
   controller:'everyoneCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/profile',{
   templateUrl:'profile.html',
   controller:'profileCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/notifications',{
   templateUrl:'notifications.html',
   controller:'notificationsCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/settings',{
   templateUrl:'settings.html',
   controller:'settingsCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() === null){
         $location.path('/signin');
       }
     }
   }
 })
 .when('/signin',{
   templateUrl:'signin.html',
   controller:'signinCtrl',
   resolve:{
     "check":function(storage,$location){
       if(storage.get_U_u() != null){
         $location.path('/overview');
       }
     }
   }
 })
 .otherwise({
   redirectTo:'/'
 })
 $locationProvider.hashPrefix('');
 $locationProvider.html5Mode(true);
});
 // Routing ends

 // creating storage service for userdata starts
chuks_project.service('storage',function($cookies,$window,$http,$location){
     var u_u = "CHUKS_PROJECT_UJKDJNKD";
     var ail = "CHUKS_PROJECT_MSLSKDJK";
     var ame = "CHUKS_PROJECT_NDKNDSDJ";
     var role = "CHUKS_PROJECT_RSKDNKSNDS";
     var username = "CHUKS_PROJECT_USERLJDNJO";
     var post_id = "CHUKS_PROJECT_POST_ID";
     var post_cat = "CHUKS_PROJECT_POST_CAT";
     var user_image = "CHUKS_PROJECT_USER_IMAGE";
     this.setAil = function(obj){
       $window.localStorage.setItem(ail,obj);
     }
     this.getAil = function(){
       return $window.localStorage.getItem(ail);
     }
     this.setName = function(obj){
       $window.localStorage.setItem(ame,obj);
     }
     this.getName = function(){
       return $window.localStorage.getItem(ame);
     }
     this.set_U_u = function (obj) {
       $window.localStorage.setItem(u_u,obj);
     }
     this.get_U_u = function (obj) {
       return $window.localStorage.getItem(u_u);
     }
     this.setRole = function(obj){
       $window.localStorage.setItem(role,obj);
     }
     this.getRole = function(){
       return $window.localStorage.getItem(role);
     }
     this.setUsername = function(obj){
       $window.localStorage.setItem(username,obj);
     }
     this.getUsername = function(){
       return $window.localStorage.getItem(username);
     }
     this.setPostID = function(obj){
       $window.localStorage.setItem(post_id,obj);
     }
     this.getPostID = function(){
       return $window.localStorage.getItem(post_id);
     }
     this.setPostCat = function(obj){
       $window.localStorage.setItem(post_cat,obj);
     }
     this.getPostCat = function(){
       return $window.localStorage.getItem(post_cat);
     }
     this.setUserImage = function(obj){
       $window.localStorage.setItem(user_image,obj);
     }
     this.getUserImage = function(){
       return $window.localStorage.getItem(user_image);
     }

     this.getAuth = function () {
       if (xnyderAuth.isLoggedIn() && ($window.localStorage.getItem(ail) == xnyderAuth.userDetails.emailAddress())) {
         return "Logged In";
       }
       else {
         return null;
       }
     }

     this.showProducts = function () {
       xnyderAuth.grid();
     }

     this.exit = function(){
       $window.localStorage.removeItem(ail);
       $window.localStorage.removeItem(u_u);
       $window.localStorage.removeItem(ame);
       $window.localStorage.removeItem(role);
       $window.localStorage.removeItem(username);
       $window.localStorage.removeItem(post_id);
       $window.localStorage.removeItem(post_cat);
       $window.localStorage.removeItem(user_image);
       $location.path('/signin');
     }
   });

chuks_project.service('notify', function ($http) {
 this.do_notify = function (user_uuid, type, action) {
   var message;

   var notify_data = {
     "user_uuid":user_uuid,
     "type":type,
     "action":action
   }

   $http.post('server/notify.php', notify_data)
     .then(function (response) {
       if (response.data.engineMessage == 1) {
         return message = "success";
       }
       else {
         return message = "error";
       }
     }, function (error) {
       return message = "error";
     })

 };
});

chuks_project.service('history', function ($http) {
 this.add_history = function (category, person, type, auth_type) {
   var message;

   var history_data = {
     "category":category,
     "person":person,
     "type":type,
     "auth_type":auth_type
   }

   $http.post('server/add_history.php', history_data)
     .then(function (response) {
       if (response.data.engineMessage == 1) {
         return message = "success";
       }
       else {
         return message = "error";
       }
     }, function (error) {
       return message = "error";
     })

 };
});

chuks_project.service('strip_text', function () {
  this.get_stripped = function (text) {
    let str = text;
    let new_str = str.replace(/-/g, '');
    let new_str_2 = new_str.replace(/  /g, '-');
    let new_str_3 = new_str_2.replace(/[ +#(),*!"<>~`;:?]/g, '-');
    let new_str_4 = new_str_3.replace(/-----/g, '-');
    let new_str_5 = new_str_4.replace(/----/g, '-');
    let new_str_6 = new_str_5.replace(/---/g, '-');
    let new_str_7 = new_str_6.replace(/--/g, '-');
    let re_text = new_str_7.toLowerCase();
    return re_text;
  }
});

chuks_project.service('listLGA', function () {
  this.list = function () {
    var lgaList = {
      Abia: [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikwuano",
        "Isiala Ngwa North",
        "Isiala Ngwa South",
        "Isuikwuato",
        "Obi Ngwa",
        "Ohafia",
        "Osisioma",
        "Ugwunagbo",
        "Ukwa East",
        "Ukwa West",
        "Umuahia North",
        "Umuahia South",
        "Umu Nneochi"
      ],
      Adamawa: [
        "Demsa",
        "Fufure",
        "Ganye",
        "Gayuk",
        "Gombi",
        "Grie",
        "Hong",
        "Jada",
        "Larmurde",
        "Madagali",
        "Maiha",
        "Mayo Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South"
      ],
      "Akwa Ibom": [
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono-Ibom",
        "Ika",
        "Ikono",
        "Ikot Abasi",
        "Ikot Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat-Enin",
        "Nsit-Atai",
        "Nsit-Ibom",
        "Nsit-Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung-Uko",
        "Ukanafun",
        "Uruan",
        "Urue-Offong Oruko",
        "Uyo"
      ],
      Anambra: [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili South",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi"
      ],
      Bauchi: [
        "Alkaleri",
        "Bauchi",
        "Bogoro",
        "Damban",
        "Darazo",
        "Dass",
        "Gamawa",
        "Ganjuwa",
        "Giade",
        "Itas-Gadau",
        "Jama are",
        "Katagum",
        "Kirfi",
        "Misau",
        "Ningi",
        "Shira",
        "Tafawa Balewa",
        " Toro",
        " Warji",
        " Zaki"
      ],
      Bayelsa: [
        "Brass",
        "Ekeremor",
        "Kolokuma Opokuma",
        "Nembe",
        "Ogbia",
        "Sagbama",
        "Southern Ijaw",
        "Yenagoa"
      ],
      Benue: [
        "Agatu",
        "Apa",
        "Ado",
        "Buruku",
        "Gboko",
        "Guma",
        "Gwer East",
        "Gwer West",
        "Katsina-Ala",
        "Konshisha",
        "Kwande",
        "Logo",
        "Makurdi",
        "Obi",
        "Ogbadibo",
        "Ohimini",
        "Oju",
        "Okpokwu",
        "Oturkpo",
        "Tarka",
        "Ukum",
        "Ushongo",
        "Vandeikya"
      ],
      Borno: [
        "Abadam",
        "Askira-Uba",
        "Bama",
        "Bayo",
        "Biu",
        "Chibok",
        "Damboa",
        "Dikwa",
        "Gubio",
        "Guzamala",
        "Gwoza",
        "Hawul",
        "Jere",
        "Kaga",
        "Kala-Balge",
        "Konduga",
        "Kukawa",
        "Kwaya Kusar",
        "Mafa",
        "Magumeri",
        "Maiduguri",
        "Marte",
        "Mobbar",
        "Monguno",
        "Ngala",
        "Nganzai",
        "Shani"
      ],
      "Cross River": [
        "Abi",
        "Akamkpa",
        "Akpabuyo",
        "Bakassi",
        "Bekwarra",
        "Biase",
        "Boki",
        "Calabar Municipal",
        "Calabar South",
        "Etung",
        "Ikom",
        "Obanliku",
        "Obubra",
        "Obudu",
        "Odukpani",
        "Ogoja",
        "Yakuur",
        "Yala"
      ],
      Delta: [
        "Aniocha North",
        "Aniocha South",
        "Bomadi",
        "Burutu",
        "Ethiope East",
        "Ethiope West",
        "Ika North East",
        "Ika South",
        "Isoko North",
        "Isoko South",
        "Ndokwa East",
        "Ndokwa West",
        "Okpe",
        "Oshimili North",
        "Oshimili South",
        "Patani",
        "Sapele",
        "Udu",
        "Ughelli North",
        "Ughelli South",
        "Ukwuani",
        "Uvwie",
        "Warri North",
        "Warri South",
        "Warri South West"
      ],
      Ebonyi: [
        "Abakaliki",
        "Afikpo North",
        "Afikpo South",
        "Ebonyi",
        "Ezza North",
        "Ezza South",
        "Ikwo",
        "Ishielu",
        "Ivo",
        "Izzi",
        "Ohaozara",
        "Ohaukwu",
        "Onicha"
      ],
      Edo: [
        "Akoko-Edo",
        "Egor",
        "Esan Central",
        "Esan North-East",
        "Esan South-East",
        "Esan West",
        "Etsako Central",
        "Etsako East",
        "Etsako West",
        "Igueben",
        "Ikpoba Okha",
        "Orhionmwon",
        "Oredo",
        "Ovia North-East",
        "Ovia South-West",
        "Owan East",
        "Owan West",
        "Uhunmwonde"
      ],
      Ekiti: [
        "Ado Ekiti",
        "Efon",
        "Ekiti East",
        "Ekiti South-West",
        "Ekiti West",
        "Emure",
        "Gbonyin",
        "Ido Osi",
        "Ijero",
        "Ikere",
        "Ikole",
        "Ilejemeje",
        "Irepodun-Ifelodun",
        "Ise-Orun",
        "Moba",
        "Oye"
      ],
      Rivers: [
        "Port Harcourt",
        "Obio-Akpor",
        "Okrika",
        "Ogu–Bolo",
        "Eleme",
        "Tai",
        "Gokana",
        "Khana",
        "Oyigbo",
        "Opobo–Nkoro",
        "Andoni",
        "Bonny",
        "Degema",
        "Asari-Toru",
        "Akuku-Toru",
        "Abua–Odual",
        "Ahoada West",
        "Ahoada East",
        "Ogba–Egbema–Ndoni",
        "Emohua",
        "Ikwerre",
        "Etche",
        "Omuma"
      ],
      Enugu: [
        "Aninri",
        "Awgu",
        "Enugu East",
        "Enugu North",
        "Enugu South",
        "Ezeagu",
        "Igbo Etiti",
        "Igbo Eze North",
        "Igbo Eze South",
        "Isi Uzo",
        "Nkanu East",
        "Nkanu West",
        "Nsukka",
        "Oji River",
        "Udenu",
        "Udi",
        "Uzo Uwani"
      ],
      Abuja: [
        "Abaji",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali",
        "Municipal Area Council"
      ],
      Gombe: [
        "Akko",
        "Balanga",
        "Billiri",
        "Dukku",
        "Funakaye",
        "Gombe",
        "Kaltungo",
        "Kwami",
        "Nafada",
        "Shongom",
        "Yamaltu-Deba"
      ],
      Imo: [
        "Aboh Mbaise",
        "Ahiazu Mbaise",
        "Ehime Mbano",
        "Ezinihitte",
        "Ideato North",
        "Ideato South",
        "Ihitte-Uboma",
        "Ikeduru",
        "Isiala Mbano",
        "Isu",
        "Mbaitoli",
        "Ngor Okpala",
        "Njaba",
        "Nkwerre",
        "Nwangele",
        "Obowo",
        "Oguta",
        "Ohaji-Egbema",
        "Okigwe",
        "Orlu",
        "Orsu",
        "Oru East",
        "Oru West",
        "Owerri Municipal",
        "Owerri North",
        "Owerri West",
        "Unuimo"
      ],
      Jigawa: [
        "Auyo",
        "Babura",
        "Biriniwa",
        "Birnin Kudu",
        "Buji",
        "Dutse",
        "Gagarawa",
        "Garki",
        "Gumel",
        "Guri",
        "Gwaram",
        "Gwiwa",
        "Hadejia",
        "Jahun",
        "Kafin Hausa",
        "Kazaure",
        "Kiri Kasama",
        "Kiyawa",
        "Kaugama",
        "Maigatari",
        "Malam Madori",
        "Miga",
        "Ringim",
        "Roni",
        "Sule Tankarkar",
        "Taura",
        "Yankwashi"
      ],
      Kaduna: [
        "Birnin Gwari",
        "Chikun",
        "Giwa",
        "Igabi",
        "Ikara",
        "Jaba",
        "Jema a",
        "Kachia",
        "Kaduna North",
        "Kaduna South",
        "Kagarko",
        "Kajuru",
        "Kaura",
        "Kauru",
        "Kubau",
        "Kudan",
        "Lere",
        "Makarfi",
        "Sabon Gari",
        "Sanga",
        "Soba",
        "Zangon Kataf",
        "Zaria"
      ],
      Kano: [
        "Ajingi",
        "Albasu",
        "Bagwai",
        "Bebeji",
        "Bichi",
        "Bunkure",
        "Dala",
        "Dambatta",
        "Dawakin Kudu",
        "Dawakin Tofa",
        "Doguwa",
        "Fagge",
        "Gabasawa",
        "Garko",
        "Garun Mallam",
        "Gaya",
        "Gezawa",
        "Gwale",
        "Gwarzo",
        "Kabo",
        "Kano Municipal",
        "Karaye",
        "Kibiya",
        "Kiru",
        "Kumbotso",
        "Kunchi",
        "Kura",
        "Madobi",
        "Makoda",
        "Minjibir",
        "Nasarawa",
        "Rano",
        "Rimin Gado",
        "Rogo",
        "Shanono",
        "Sumaila",
        "Takai",
        "Tarauni",
        "Tofa",
        "Tsanyawa",
        "Tudun Wada",
        "Ungogo",
        "Warawa",
        "Wudil"
      ],
      Katsina: [
        "Bakori",
        "Batagarawa",
        "Batsari",
        "Baure",
        "Bindawa",
        "Charanchi",
        "Dandume",
        "Danja",
        "Dan Musa",
        "Daura",
        "Dutsi",
        "Dutsin Ma",
        "Faskari",
        "Funtua",
        "Ingawa",
        "Jibia",
        "Kafur",
        "Kaita",
        "Kankara",
        "Kankia",
        "Katsina",
        "Kurfi",
        "Kusada",
        "Mai Adua",
        "Malumfashi",
        "Mani",
        "Mashi",
        "Matazu",
        "Musawa",
        "Rimi",
        "Sabuwa",
        "Safana",
        "Sandamu",
        "Zango"
      ],
      Kebbi: [
        "Aleiro",
        "Arewa Dandi",
        "Argungu",
        "Augie",
        "Bagudo",
        "Birnin Kebbi",
        "Bunza",
        "Dandi",
        "Fakai",
        "Gwandu",
        "Jega",
        "Kalgo",
        "Koko Besse",
        "Maiyama",
        "Ngaski",
        "Sakaba",
        "Shanga",
        "Suru",
        "Wasagu Danko",
        "Yauri",
        "Zuru"
      ],
      Kogi: [
        "Adavi",
        "Ajaokuta",
        "Ankpa",
        "Bassa",
        "Dekina",
        "Ibaji",
        "Idah",
        "Igalamela Odolu",
        "Ijumu",
        "Kabba Bunu",
        "Kogi",
        "Lokoja",
        "Mopa Muro",
        "Ofu",
        "Ogori Magongo",
        "Okehi",
        "Okene",
        "Olamaboro",
        "Omala",
        "Yagba East",
        "Yagba West"
      ],
      Kwara: [
        "Asa",
        "Baruten",
        "Edu",
        "Ekiti",
        "Ifelodun",
        "Ilorin East",
        "Ilorin South",
        "Ilorin West",
        "Irepodun",
        "Isin",
        "Kaiama",
        "Moro",
        "Offa",
        "Oke Ero",
        "Oyun",
        "Pategi"
      ],
      Lagos: [
        "Agege",
        "Ajeromi-Ifelodun",
        "Alimosho",
        "Amuwo-Odofin",
        "Apapa",
        "Badagry",
        "Epe",
        "Eti Osa",
        "Ibeju-Lekki",
        "Ifako-Ijaiye",
        "Ikeja",
        "Ikorodu",
        "Kosofe",
        "Lagos Island",
        "Lagos Mainland",
        "Mushin",
        "Ojo",
        "Oshodi-Isolo",
        "Shomolu",
        "Surulere"
      ],
      Nassarawa: [
        "Akwanga",
        "Awe",
        "Doma",
        "Karu",
        "Keana",
        "Keffi",
        "Kokona",
        "Lafia",
        "Nasarawa",
        "Nasarawa Egon",
        "Obi",
        "Toto",
        "Wamba"
      ],
      Niger: [
        "Agaie",
        "Agwara",
        "Bida",
        "Borgu",
        "Bosso",
        "Chanchaga",
        "Edati",
        "Gbako",
        "Gurara",
        "Katcha",
        "Kontagora",
        "Lapai",
        "Lavun",
        "Magama",
        "Mariga",
        "Mashegu",
        "Mokwa",
        "Moya",
        "Paikoro",
        "Rafi",
        "Rijau",
        "Shiroro",
        "Suleja",
        "Tafa",
        "Wushishi"
      ],
      Ogun: [
        "Abeokuta North",
        "Abeokuta South",
        "Ado-Odo Ota",
        "Egbado North",
        "Egbado South",
        "Ewekoro",
        "Ifo",
        "Ijebu East",
        "Ijebu North",
        "Ijebu North East",
        "Ijebu Ode",
        "Ikenne",
        "Imeko Afon",
        "Ipokia",
        "Obafemi Owode",
        "Odeda",
        "Odogbolu",
        "Ogun Waterside",
        "Remo North",
        "Shagamu"
      ],
      Ondo: [
        "Akoko North-East",
        "Akoko North-West",
        "Akoko South-West",
        "Akoko South-East",
        "Akure North",
        "Akure South",
        "Ese Odo",
        "Idanre",
        "Ifedore",
        "Ilaje",
        "Ile Oluji-Okeigbo",
        "Irele",
        "Odigbo",
        "Okitipupa",
        "Ondo East",
        "Ondo West",
        "Ose",
        "Owo"
      ],
      Osun: [
        "Atakunmosa East",
        "Atakunmosa West",
        "Aiyedaade",
        "Aiyedire",
        "Boluwaduro",
        "Boripe",
        "Ede North",
        "Ede South",
        "Ife Central",
        "Ife East",
        "Ife North",
        "Ife South",
        "Egbedore",
        "Ejigbo",
        "Ifedayo",
        "Ifelodun",
        "Ila",
        "Ilesa East",
        "Ilesa West",
        "Irepodun",
        "Irewole",
        "Isokan",
        "Iwo",
        "Obokun",
        "Odo Otin",
        "Ola Oluwa",
        "Olorunda",
        "Oriade",
        "Orolu",
        "Osogbo"
      ],
      Oyo: [
        "Afijio",
        "Akinyele",
        "Atiba",
        "Atisbo",
        "Egbeda",
        "Ibadan North",
        "Ibadan North-East",
        "Ibadan North-West",
        "Ibadan South-East",
        "Ibadan South-West",
        "Ibarapa Central",
        "Ibarapa East",
        "Ibarapa North",
        "Ido",
        "Irepo",
        "Iseyin",
        "Itesiwaju",
        "Iwajowa",
        "Kajola",
        "Lagelu",
        "Ogbomosho North",
        "Ogbomosho South",
        "Ogo Oluwa",
        "Olorunsogo",
        "Oluyole",
        "Ona Ara",
        "Orelope",
        "Ori Ire",
        "Oyo",
        "Oyo East",
        "Saki East",
        "Saki West",
        "Surulere"
      ],
      Plateau: [
        "Bokkos",
        "Barkin Ladi",
        "Bassa",
        "Jos East",
        "Jos North",
        "Jos South",
        "Kanam",
        "Kanke",
        "Langtang South",
        "Langtang North",
        "Mangu",
        "Mikang",
        "Pankshin",
        "Qua an Pan",
        "Riyom",
        "Shendam",
        "Wase"
      ],
      Sokoto: [
        "Binji",
        "Bodinga",
        "Dange Shuni",
        "Gada",
        "Goronyo",
        "Gudu",
        "Gwadabawa",
        "Illela",
        "Isa",
        "Kebbe",
        "Kware",
        "Rabah",
        "Sabon Birni",
        "Shagari",
        "Silame",
        "Sokoto North",
        "Sokoto South",
        "Tambuwal",
        "Tangaza",
        "Tureta",
        "Wamako",
        "Wurno",
        "Yabo"
      ],
      Taraba: [
        "Ardo Kola",
        "Bali",
        "Donga",
        "Gashaka",
        "Gassol",
        "Ibi",
        "Jalingo",
        "Karim Lamido",
        "Kumi",
        "Lau",
        "Sardauna",
        "Takum",
        "Ussa",
        "Wukari",
        "Yorro",
        "Zing"
      ],
      Yobe: [
        "Bade",
        "Bursari",
        "Damaturu",
        "Fika",
        "Fune",
        "Geidam",
        "Gujba",
        "Gulani",
        "Jakusko",
        "Karasuwa",
        "Machina",
        "Nangere",
        "Nguru",
        "Potiskum",
        "Tarmuwa",
        "Yunusari",
        "Yusufari"
      ],
      Zamfara: [
        "Anka",
        "Bakura",
        "Birnin Magaji Kiyaw",
        "Bukkuyum",
        "Bungudu",
        "Gummi",
        "Gusau",
        "Kaura Namoda",
        "Maradun",
        "Maru",
        "Shinkafi",
        "Talata Mafara",
        "Chafe",
        "Zurmi"
      ]
    }

    return lgaList;
  }

});

chuks_project.service('cncf_nations', function () {
  this.nations = function () {
    var nations_list = [
      'ABANIMO',
      'AKRIBAY',
      'BOYOAD',
      'CREBEN',
      'JIGOBA',
      'KAKAKA',
      'KODELEDO',
      'KWOYOS',
      'NIGNASABU',
      'OGONLA',
      'PLATARBEN',
      'SOKEZA'
    ]

    return nations_list;
  };
});

chuks_project.service('cncf_states', function () {
  this.states = function () {
    var states_list = {
      "ABANIMO": [
        "Abia",
        "Anambra",
        "Imo"
      ],
      "AKRIBAY": [
        "Akwa Ibom",
        "Rivers",
        "Bayelsa"
      ],
      "BOYOAD": [
        "Borno",
        "Yobe",
        "Adamawa"
      ],
      "CREBEN": [
        "Cross River",
        "Ebonyi",
        "Enugu"
      ],
      "JIGOBA": [
        "Jigawa",
        "Gombe",
        "Bauchi"
      ],
      "KAKAKA": [
        "Katsina",
        "Kaduna",
        "Kano"
      ],
      "KODELEDO": [
        "Kogi",
        "Delta",
        "Edo"
      ],
      "KWOYOS": [
        "Kwara",
        "Oyo",
        "Osun"
      ],
      "NIGNASABU": [
        "Niger",
        "Nassarawa",
        "Abuja"
      ],
      "OGONLA": [
        "Ogun",
        "Ondo",
        "Lagos"
      ],
      "PLATARBEN": [
        "Plateau",
        "Taraba",
        "Benue",
      ],
      "SOKEZA": [
        "Sokoto",
        "Kebbi",
        "Zamfara"
      ],
      // Nigeria: [
      //   "Ekiti",
      // ]
    }

    return states_list;
  };
});

chuks_project.service('cncf_areas', function () {
  this.areas = function () {
    var areas_list = {
      Rivers: [
        "Port Harcourt Area 1",
        "Port Harcourt Area 2",
        "Ogoni Area",
        "Orashi Area",
        "Andoni Area",
        "Kalabari Area",
        "Ikwerre/Etche/Emohua Area"
      ]
    }

    return areas_list;
  };
});

chuks_project.service('cncf_zones', function () {
  this.zones = function () {
    var zones_list = {
      "Port Harcourt Area 1": [
        "Town Zone",
        "Diobu Zone",
        "Rumuorlumeni Zone",
        "Wakirike Zone",
        "Bonny Zone"
      ],
      "Port Harcourt Area 2": [
        "Rumuomasi Zone",
        "Presidential Zone",
        "Eneka Zone",
        "Oyigbo Zone"
      ],
      "Ogoni Area": [
        "Khana Zone",
        "Gokana Zone",
        "Eleme Zone",
        "Tai Zone",
        "Opobo Zone"
      ],
      "Orashi Area": [
        "Ahoada Zone",
        "Omoku Zone",
        "Abua Zone",
        "Egi Zone",
        "Okpeden Zone",
        "Ubie-Igbuduya Zone"
      ],
      "Andoni Area": [
        "Ajakajak Zone",
        "Iwoefuk Zone",
        "Uyeada Zone",
        "Unyeangala Zone"
      ],
      "Kalabari Area": [
        "Abonnema Zone",
        "Buguma Zone",
        "Degema Zone"
      ],
      "Ikwerre/Etche/Emohua Area": [
        "Igwuruta Zone",
        "Etche Zone",
        "Risimini Zone",
        "Elele-Ubima Zone",
        "Omudiogha Zone",
        "Emohua Zone",
        "Mba/Ozuzu Zone",
        "Okehi Zone",
        "Ulakwo Zone"
      ]
    }

    return zones_list;
  };
});

chuks_project.service('cncf_bethels', function () {
  this.bethels = function () {
    var bethels_list = {
      "Ajakajak Zone": [
        "Ajakajak Bethel",
        "Ibotirem Bethel"
      ],
      "Iwoefuk Zone": [
        "Iwofuuk Bethel"
      ],
      "Unyeangala Zone": [
        "Ngo City Bethel",
        "Unyengala Bethel",
        "Ocean Bethel"
      ],
      "Uyeada Zone": [
        "Unyeada Bethel"
      ],
      "Ahoada Zone": [
        "Ahoada Bethel"
      ],
      "Omoku Zone": [
        "Omoku Bethel"
      ],
      "Abua Zone": [
        "Central Abua Bethel"
      ],
      "Egi Zone": [
        "Ogbogu Bethel"
      ],
      "Okpeden Zone": [
        "Okpeden Bethel"
      ],
      "Ubie-Igbuduya Zone": [
        "Ubeta Bethel"
      ],
      "Town Zone": [
        "125 Aggrey Road Bethel",
        "Abuloma Bethel",
        "Central Bethel PH",
        "Marine Base Bethel",
        "New Layout Amadi-Ama Bethel",
        "Ogu Water Front Bethel",
        "Ozuboko Bethel",
        "Peace Bethel",
        "Reclamation Bethel",
        "Youth Fellowship"
      ],
      "Rumuorlumeni Zone": [
        "Aker Road Bethel",
        "Rumuorlumeni Bethel",
        "Elioparanwo Bethel",
        "Grace Bethel",
        "Iwofe Bethel"
      ],
      "Wakirike Zone": [
        "First Island Bethel",
        "Central Bethel Wakirike",
        "Okochiri Bethel",
        "Okrika Bethel"
      ],
      "Bonny Zone": [
        "King Of Kings Bethel",
        "Liberation Bethel",
        "Light House Bethel",
        "Love Bethel"
      ],
      "Diobu Zone": [
        "51 Ngo Bethel",
        "Mother Bethel",
        "Agip Bethel",
        "Family Bethel",
        "Elechi Beach Bethel",
        "Christ Practical Students Fellowship"
      ],
      "Khana Zone": [
        "Kono Bethel",
        "Wiiyaakara Bethel",
        "Luebe Bethel",
        "Gwara Bethel",
        "Bori Bethel"
      ],
      "Gokana Zone": [
        "K-Dere Bethel",
        "Bomu Bethel"
      ],
      "Eleme Zone": [
        "Agbonchia Bethel",
        "Alesa Bethel",
        "Aleto Bethel",
        "Ebubu Central Bethel",
        "Ebubu Unity Bethel",
        "Eteo Supreme Bethel",
        "Onne Central Bethel",
        "Onne Seaport Bethel"
      ],
      "Tai Zone": [
        "Sime Bethel",
        "Kiran Bethel"
      ],
      "Opobo Zone": [
        "Opobo Bethel"
      ],
      "Abonnema Zone": [
        "Abonnema Bethel",
        "Soku Bethel"
      ],
      "Buguma Zone": [
        "Buguma Bethel"
      ],
      "Degema Zone": [
        "Degema Bethel"
      ],
      "Rumuomasi Zone": [
        "Rumuomasi Bethel",
        "Elelenwo Bethel",
        "New Nazaret",
        "Ogingba Bethel"
      ],
      "Presidential Zone": [
        "Presidential Bethel",
        "Rumueprikom Bethel",
        "Testimony Bethel",
        "Rumueme Bethel",
        "Choba Bethel",
        "Rumualogu Bethel",
        "Crystal Avenue Bethel",
        "Oginigba Bethel",
        "Aluu Umoku Bethel"
      ],
      "Eneka Zone": [
        "Eneka Bethel",
        "Rumudara Bethel",
        "Rumuodumaya Bethel",
        "Elimgbu Bethel"
      ],
      "Oyigbo Zone": [
        "Oyigbo Bethel",
        "Iriebe Bethel",
        "New Life Bethel"
      ],
      "Igwuruta Zone": [
        "Igwuruta Bethel",
        "Golden Bethel"
      ],
      "Etche Zone": [
        "Igbo Bethel",
        "Chokocho Bethel",
        "Igbo Ultra Modern Bethel",
        "Igwi Bethel",
        "Umuechem Bethel"
      ],
      "Risimini Zone": [
        "Ndele Bethel",
        "Rumuji Bethel",
        "Rumuodogo Bethel",
        "Ibaa Obelle Bethel",
        "Rumuewhor Bethel",
        "Elele Bethel"
      ],
      "Elele-Ubima Zone": [
        "Elele Bethel",
        "Ubima Bethel"
      ],
      "Omudiogha Zone": [
        "Omudioga Bethel"
      ],
      "Emohua Zone": [
        "Emohua Central Bethel",
        "Elibrada Bethel",
        "Oduoha Bethel",
        "Ahai Bethel"
      ],
      "Mba/Ozuzu Zone": [
        "Umuaturu Bethel",
        "Ihie liberation Bethel",
        "Umuoye Bethel",
        "Apoku Bethel",
        "Obite Bethel",
        "Ozuzu Bethel",
        "Nadshi Palace Bethel"
      ],
      "Okehi Zone": [
        "Okehi Bethel",
        "Igbodo Bethel",
        "Egbeke Bethel"
      ],
      "Ulakwo Zone": [
        "Ulakwo Bethel",
        "Afara Bethel",
        "Odokwa Bethel"
      ],
    }

    return bethels_list;
  };
});

chuks_project.service('cncf_choirs', function () {
  this.choirs = function () {
    var choirs_list = {
      "Ajakajak Zone": [
        "Ajakajak Bethel Choir",
        "Ibotirem Bethel Choir"
      ],
      "Iwoefuk Zone": [
        "Iwofuuk Bethel Choir"
      ],
      "Unyeangala Zone": [
        "Ngo City Bethel Choir",
        "Unyengala Bethel Choir",
        "Ocean Bethel Choir"
      ],
      "Uyeada Zone": [
        "Unyeada Bethel Choir"
      ],
      "Ahoada Zone": [
        "Ahoada Bethel Choir"
      ],
      "Omoku Zone": [
        "Omoku Bethel Choir"
      ],
      "Abua Zone": [
        "Central Abua Bethel Choir"
      ],
      "Egi Zone": [
        "Ogbogu Bethel Choir"
      ],
      "Okpeden Zone": [
        "Okpeden Bethel Choir"
      ],
      "Ubie-Igbuduya Zone": [
        "Ubeta Bethel Choir"
      ],
      "Town Zone": [
        "125 Aggrey Road Bethel Choir",
        "Abuloma Bethel Choir",
        "Central Bethel Choir PH",
        "Marine Base Bethel Choir",
        "New Layout Amadi-Ama Bethel Choir",
        "Ogu Water Front Bethel Choir",
        "Ozuboko Bethel Choir",
        "Peace Bethel Choir",
        "Reclamation Bethel Choir",
        "Youth Fellowship Choir"
      ],
      "Rumuorlumeni Zone": [
        "Aker Road Bethel Choir",
        "Rumuorlumeni Bethel Choir",
        "Elioparanwo Bethel Choir",
        "Grace Bethel Choir",
        "Iwofe Bethel Choir"
      ],
      "Wakirike Zone": [
        "First Island Bethel Choir",
        "Central Bethel Choir Wakirike",
        "Okochiri Bethel Choir",
        "Okrika Bethel Choir"
      ],
      "Bonny Zone": [
        "King Of Kings Bethel Choir",
        "Liberation Bethel Choir",
        "Light House Bethel Choir",
        "Love Bethel Choir"
      ],
      "Diobu Zone": [
        "51 Ngo Bethel Choir",
        "Mother Bethel Choir",
        "Agip Bethel Choir",
        "Family Bethel Choir",
        "Elechi Beach Bethel Choir",
        "Christ Practical Students Fellowship Choir"
      ],
      "Khana Zone": [
        "Kono Bethel Choir",
        "Wiiyaakara Bethel Choir",
        "Luebe Bethel Choir",
        "Gwara Bethel Choir",
        "Bori Bethel Choir"
      ],
      "Gokana Zone": [
        "K-Dere Bethel Choir",
        "Bomu Bethel Choir"
      ],
      "Eleme Zone": [
        "Agbonchia Bethel Choir",
        "Alesa Bethel Choir",
        "Aleto Bethel Choir",
        "Ebubu Central Bethel Choir",
        "Ebubu Unity Bethel Choir",
        "Eteo Supreme Bethel Choir",
        "Onne Central Bethel Choir",
        "Onne Seaport Bethel Choir"
      ],
      "Tai Zone": [
        "Sime Bethel Choir",
        "Kiran Bethel Choir"
      ],
      "Opobo Zone": [
        "Opobo Bethel Choir"
      ],
      "Abonnema Zone": [
        "Abonnema Bethel Choir",
        "Soku Bethel Choir"
      ],
      "Buguma Zone": [
        "Buguma Bethel Choir"
      ],
      "Degema Zone": [
        "Degema Bethel Choir"
      ],
      "Rumuomasi Zone": [
        "Rumuomasi Bethel Choir",
        "Elelenwo Bethel Choir",
        "New Nazaret Choir",
        "Ogingba Bethel Choir"
      ],
      "Presidential Zone": [
        "Presidential Bethel Choir",
        "Rumueprikom Bethel Choir",
        "Testimony Bethel Choir",
        "Rumueme Bethel Choir",
        "Choba Bethel Choir",
        "Rumualogu Bethel Choir",
        "Crystal Avenue Bethel Choir",
        "Oginigba Bethel Choir",
        "Aluu Umoku Bethel Choir"
      ],
      "Eneka Zone": [
        "Eneka Bethel Choir",
        "Rumudara Bethel Choir",
        "Rumuodumaya Bethel Choir",
        "Elimgbu Bethel Choir"
      ],
      "Oyigbo Zone": [
        "Oyigbo Bethel Choir",
        "Iriebe Bethel Choir",
        "New Life Bethel Choir"
      ],
      "Igwuruta Zone": [
        "Igwuruta Bethel Choir",
        "Golden Bethel Choir"
      ],
      "Etche Zone": [
        "Igbo Bethel Choir",
        "Chokocho Bethel Choir",
        "Igbo Ultra Modern Bethel Choir",
        "Igwi Bethel Choir",
        "Umuechem Bethel Choir"
      ],
      "Risimini Zone": [
        "Ndele Bethel Choir",
        "Rumuji Bethel Choir",
        "Rumuodogo Bethel Choir",
        "Ibaa Obelle Bethel Choir",
        "Rumuewhor Bethel Choir",
        "Elele Bethel Choir"
      ],
      "Elele-Ubima Zone": [
        "Elele Bethel Choir",
        "Ubima Bethel Choir"
      ],
      "Omudiogha Zone": [
        "Omudioga Bethel Choir"
      ],
      "Emohua Zone": [
        "Emohua Central Bethel Choir",
        "Elibrada Bethel Choir",
        "Oduoha Bethel Choir",
        "Ahai Bethel Choir"
      ],
      "Mba/Ozuzu Zone": [
        "Umuaturu Bethel Choir",
        "Ihie liberation Bethel Choir",
        "Umuoye Bethel Choir",
        "Apoku Bethel Choir",
        "Obite Bethel Choir",
        "Ozuzu Bethel Choir",
        "Nadshi Palace Bethel Choir"
      ],
      "Okehi Zone": [
        "Okehi Bethel Choir",
        "Igbodo Bethel Choir",
        "Egbeke Bethel Choir"
      ],
      "Ulakwo Zone": [
        "Ulakwo Bethel Choir",
        "Afara Bethel Choir",
        "Odokwa Bethel Choir"
      ],
    }

    return choirs_list;
  };
});

chuks_project.run(function($rootScope,$anchorScroll){
    $rootScope.$on("$locationChangeSuccess", function(){
        $anchorScroll();
    })
});

chuks_project.directive('fileModel', ['$parse', function ($parse) {
  //for file upload
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);

chuks_project.filter('fil_date', function () {
  return function (date) {
    let raw_date = date;
    let split_raw = raw_date != undefined ? raw_date.split(" ") : null;
    let splitted_raw = split_raw != undefined ? split_raw[0] : null;

    return splitted_raw;
  }
});

chuks_project.filter('fil_time', function () {
  return function (time) {
    let raw_time = time;
    let split_raw = raw_time != undefined ? raw_time.split(" ") : null;
    let splitted_raw = split_raw != undefined ? split_raw[1] : null;

    return splitted_raw;
  }
});

chuks_project.filter('fil_fmt_time', function () {
  return function (time) {
    let raw_time = time;
    let split_raw = raw_time != undefined ? raw_time.split(":") : null;
    let splitted_raw = split_raw != undefined ? split_raw[0] : null;
    let splitted_raw_2 = split_raw != undefined ? split_raw[1] : null;

    let new_time_morning = splitted_raw + ":" + splitted_raw_2 + " AM";
    // let new_time_later = splitted_raw + "." + splitted_raw_2 + "PM";

    if (splitted_raw > 0 && splitted_raw <= 11) {
      return new_time_morning;
    }
    else {

      let new_time_later;

      switch (splitted_raw) {
        case "00":
          splitted_raw = 12;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " AM";
          return new_time_later;
        break;
        case "13":
          splitted_raw = 1;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "14":
          splitted_raw = 2;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "15":
          splitted_raw = 3;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "16":
          splitted_raw = 4;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "17":
          splitted_raw = 5;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "18":
          splitted_raw = 6;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "19":
          splitted_raw = 7;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "20":
          splitted_raw = 8;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "21":
          splitted_raw = 9;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "22":
          splitted_raw = 10;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "23":
          splitted_raw = 11;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
        break;
        case "24":
          splitted_raw = 12;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " AM";
          return new_time_later;
        break;
        default:
          splitted_raw = 12;
          new_time_later = splitted_raw + ":" + splitted_raw_2 + " PM";
          return new_time_later;
      }
    }

  }
});

chuks_project.filter('fil_id', function () {
  return function (uuid) {
    let raw_uuid = uuid;
    let split_raw = raw_uuid.slice(0,5);
    let splitted_raw = new String(split_raw) + "*****";

    return splitted_raw;
  }
});

chuks_project.filter('bytes', function () {
	return function (bytes, precision) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '0 bytes' ;
		if (typeof precision === 'undefined') precision = 1 ;
		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
			number = Math.floor(Math.log(bytes) / Math.log(1024));
			return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + " " + units[number];
	}
});

chuks_project.filter('downloads', function () {
	return function (downloads) {
		if (isNaN(downloads))
			downloads = 0;

		if (downloads < 1000)
			return downloads + ' ';

		downloads /= 1000;

		if (downloads < 1000)
			return downloads.toFixed(1) + ' k';

		downloads /= 1000;

		if (downloads < 1000)
			return downloads.toFixed(1) + ' m';

		downloads /= 1000;

		if (downloads < 1000)
			return downloads.toFixed(1) + ' b';

		downloads /= 1000;

		return downloads.toFixed(1) + ' tn';
	};
});

 // Controller Starts
