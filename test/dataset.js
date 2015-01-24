module.exports = [
  {
    "desc": "nothing should be triggered in [1,900]ms of a 1s spawner",
    "spawner": {
      "initialTime": 0,
      "speed": 1000
    },
    "expected": [],
    "time": {
      "from": 1,
      "to": 900,
      "step": 100
    },
    "heads":[{"time":898,"result":[{"trigger":true,"angleFrom":0,"angleTo":0,"p":0.898,"angle":0}]}]
  },
  {
    "desc": "a basic spawning",
    "spawner": {
      "initialTime": 0,
      "speed": 333
    },
    "expected": [{"timeIndex":1,"countIndex":0,"angle":0,"position":[0,0],"velocity":[0,0],"direction":[1,0],"random1":0.1190478488296032,"random2":0.43063376562320943},{"timeIndex":2,"countIndex":0,"angle":0,"position":[0,0],"velocity":[0,0],"direction":[1,0],"random1":0.9867355410729263,"random2":0.9358536341950384}],
    "time": {
      "from": 1,
      "to": 900,
      "step": 100
    },
    "heads":[{"time":898,"result":[{"trigger":true,"angleFrom":0,"angleTo":0,"p":0.6966966966966965,"angle":0}]}]
  },
  {
    "desc": "a rotating spawning",
    "spawner": {
      "initialTime": 0,
      "speed": 1000,
      "rot": Math.PI/2,
      "pos": [42, 57],
      "ang": Math.PI,
      "vel": 1,
      "front": 10
    },
    "expected": [{"timeIndex":1,"countIndex":0,"angle":4.71238898038469,"position":[42,47],"velocity":[-1.836909530733566e-16,-1],"direction":[-1.836909530733566e-16,-1],"random1":0.1190478488296032,"random2":0.43063376562320943},{"timeIndex":2,"countIndex":0,"angle":6.283185307179586,"position":[52,57],"velocity":[1,-2.4492127076447545e-16],"direction":[1,-2.4492127076447545e-16],"random1":0.9867355410729263,"random2":0.9358536341950384}],
    "time": {
      "from": 0,
      "to": 2000,
      "step": 100
    },
    "heads":[{"time":1998,"result":[{"trigger":true,"angleFrom":-1.5707963267948966,"angleTo":0,"p":0.998,"angle":-0.003141592653589796}]}]
  },
  {
    "desc": "another rotating spawning",
    "spawner": {
      "initialTime": 0,
      "speed": 10,
      "rot": Math.PI/6,
      "pos": [420, 507],
      "ang": Math.PI,
      "vel": 0.2,
      "front": 20
    },
    "expected": [{"timeIndex":1,"countIndex":0,"angle":3.665191429188092,"position":[397.4833395016046,494],"velocity":[-0.17320508075688779,-0.09999999999999995],"direction":[-0.8660254037844388,-0.4999999999999997],"random1":0.1190478488296032,"random2":0.43063376562320943},{"timeIndex":2,"countIndex":0,"angle":4.1887902047863905,"position":[408,486.2153903091735],"velocity":[-0.10000000000000009,-0.17320508075688767],"direction":[-0.5000000000000004,-0.8660254037844384],"random1":0.9867355410729263,"random2":0.9358536341950384},{"timeIndex":3,"countIndex":0,"angle":4.71238898038469,"position":[420,485],"velocity":[-3.673819061467132e-17,-0.2],"direction":[-1.836909530733566e-16,-1],"random1":0.25137827526498946,"random2":0.7358952354065594},{"timeIndex":4,"countIndex":0,"angle":5.235987755982988,"position":[430,489.6794919243112],"velocity":[0.09999999999999987,-0.1732050807568878],"direction":[0.49999999999999933,-0.866025403784439],"random1":0.9629644398677075,"random2":0.6090362286062353},{"timeIndex":5,"countIndex":0,"angle":5.759586531581287,"position":[442.5166604983954,494],"velocity":[0.17320508075688767,-0.10000000000000009],"direction":[0.8660254037844384,-0.5000000000000004],"random1":0.9029201500536095,"random2":0.5468992587024817},{"timeIndex":6,"countIndex":0,"angle":6.283185307179586,"position":[444,507],"velocity":[0.2,-4.898425415289509e-17],"direction":[1,-2.4492127076447545e-16],"random1":0.6269966091513802,"random2":0.8221423287276882},{"timeIndex":7,"countIndex":0,"angle":6.8067840827778845,"position":[439.0525588832577,518],"velocity":[0.1732050807568878,0.09999999999999987],"direction":[0.866025403784439,0.4999999999999993],"random1":0.042563794359714045,"random2":0.5319815826868114},{"timeIndex":8,"countIndex":0,"angle":7.330382858376184,"position":[430,524.3205080756887],"velocity":[0.10000000000000012,0.17320508075688767],"direction":[0.5000000000000006,0.8660254037844384],"random1":0.7046087642807777,"random2":0.7590183742907236},{"timeIndex":9,"countIndex":0,"angle":7.853981633974483,"position":[420,533],"velocity":[6.123031769111886e-17,0.2],"direction":[3.061515884555943e-16,1],"random1":0.13424572047344083,"random2":0.18268970521254316},{"timeIndex":10,"countIndex":0,"angle":8.377580409572781,"position":[408,527.7846096908265],"velocity":[-0.09999999999999985,0.17320508075688784],"direction":[-0.4999999999999992,0.8660254037844392],"random1":0.21908723174475908,"random2":0.47653314877460834},{"timeIndex":11,"countIndex":0,"angle":8.901179185171081,"position":[400.9474411167423,518],"velocity":[-0.17320508075688779,0.09999999999999996],"direction":[-0.8660254037844388,0.4999999999999998],"random1":0.21270531452592406,"random2":0.4749924265900849},{"timeIndex":12,"countIndex":0,"angle":3.141592653589793,"position":[400,507],"velocity":[-0.2,2.4492127076447546e-17],"direction":[-1,1.2246063538223773e-16],"random1":0.23276988529474613,"random2":0.22653263336398682},{"timeIndex":13,"countIndex":0,"angle":3.6651914291880914,"position":[397.4833395016046,494],"velocity":[-0.1732050807568878,-0.09999999999999988],"direction":[-0.866025403784439,-0.4999999999999994],"random1":0.2858749115658856,"random2":0.796057536381394},{"timeIndex":14,"countIndex":0,"angle":4.1887902047863905,"position":[408,486.2153903091735],"velocity":[-0.10000000000000009,-0.17320508075688767],"direction":[-0.5000000000000004,-0.8660254037844384],"random1":0.1445635678789357,"random2":0.6153570470346289},{"timeIndex":15,"countIndex":0,"angle":4.712388980384689,"position":[420,485],"velocity":[-2.1437387455469636e-16,-0.2],"direction":[-1.0718693727734818e-15,-1],"random1":0.17196906703078055,"random2":0.4818590089587047},{"timeIndex":16,"countIndex":0,"angle":5.235987755982988,"position":[430,489.6794919243112],"velocity":[0.09999999999999987,-0.1732050807568878],"direction":[0.49999999999999933,-0.866025403784439],"random1":0.4533587349098859,"random2":0.205728819654642},{"timeIndex":17,"countIndex":0,"angle":5.759586531581286,"position":[442.51666049839537,494],"velocity":[0.1732050807568876,-0.10000000000000026],"direction":[0.8660254037844379,-0.5000000000000012],"random1":0.8712498791572176,"random2":0.8528385159768685},{"timeIndex":18,"countIndex":0,"angle":6.283185307179586,"position":[444,507],"velocity":[0.2,-4.898425415289509e-17],"direction":[1,-2.4492127076447545e-16],"random1":0.7774210319500447,"random2":0.23866357958469758},{"timeIndex":19,"countIndex":0,"angle":6.8067840827778845,"position":[439.0525588832577,518],"velocity":[0.1732050807568878,0.09999999999999987],"direction":[0.866025403784439,0.4999999999999993],"random1":0.7609817619635795,"random2":0.6574302725231225},{"timeIndex":20,"countIndex":0,"angle":7.330382858376183,"position":[430,524.3205080756887],"velocity":[0.10000000000000026,0.1732050807568876],"direction":[0.5000000000000012,0.8660254037844379],"random1":0.07133334503327395,"random2":0.3472515689824191}],
    "time": {
      "from": 0,
      "to": 200,
      "step": 40
    },
    "heads":[{"time":198,"result":[{"trigger":true,"angleFrom":0.5235987755982983,"angleTo":1.0471975511965965,"p":0.8000000000000007,"angle":0.9424777960769373}]}]
  },
  {
    "desc": "simple pattern",
    "spawner": {
      "initialTime": 0,
      "speed": 100,
      "rot": 0,
      "pos": [420, 507],
      "ang": 3,
      "vel": 0.2,
      "front": 20,
      "pattern": [2, -1, 3, -2]
    },
    "expected": [{"timeIndex":1,"countIndex":0,"angle":3,"position":[400.2001500679911,509.8224001611973],"velocity":[-0.1979984993200891,0.028224001611973443],"direction":[-0.9899924966004454,0.1411200080598672],"random1":0.1190478488296032,"random2":0.43063376562320943},{"timeIndex":2,"countIndex":0,"angle":3,"position":[400.2001500679911,509.8224001611973],"velocity":[-0.1979984993200891,0.028224001611973443],"direction":[-0.9899924966004454,0.1411200080598672],"random1":0.9867355410729263,"random2":0.9358536341950384},{"timeIndex":4,"countIndex":0,"angle":3,"position":[400.2001500679911,509.8224001611973],"velocity":[-0.1979984993200891,0.028224001611973443],"direction":[-0.9899924966004454,0.1411200080598672],"random1":0.9629644398677075,"random2":0.6090362286062353},{"timeIndex":5,"countIndex":0,"angle":3,"position":[400.2001500679911,509.8224001611973],"velocity":[-0.1979984993200891,0.028224001611973443],"direction":[-0.9899924966004454,0.1411200080598672],"random1":0.9029201500536095,"random2":0.5468992587024817},{"timeIndex":6,"countIndex":0,"angle":3,"position":[400.2001500679911,509.8224001611973],"velocity":[-0.1979984993200891,0.028224001611973443],"direction":[-0.9899924966004454,0.1411200080598672],"random1":0.6269966091513802,"random2":0.8221423287276882}],
    "time": {
      "from": 0,
      "to": 850,
      "step": 4
    },
    "heads":[{"time":848,"result":[{"trigger":true,"angleFrom":3,"angleTo":3,"p":0.4800000000000004,"angle":3}]}]
  },
  {
    "desc": "randomness1",
    "spawner": {
      "initialTime": 0,
      "speed": 100,
      "pos": [420, 507],
      "rot": 1,
      "ang": 1,
      "vel": 0.2,
      "randPos": 10,
      "randAng": 0.5,
      "randVel": 0.1,
      "seed": "foo"
    },
    "expected": [{"timeIndex":1,"countIndex":0,"angle":1.9224386187932978,"position":[421.0584593217225,509.97571027174536],"velocity":[-0.07204002710655764,0.1963528117465047],"direction":[-0.3444400686331119,0.938808307973474],"random1":0.5357651635542595,"random2":0.9385171442833539},{"timeIndex":2,"countIndex":0,"angle":2.84470936316034,"position":[416.0494870890974,508.0814154644274],"velocity":[-0.15031941258041084,0.04598640370961403],"direction":[-0.9562528982832782,0.29254126978057354],"random1":0.9262999727488598,"random2":0.9541023485666583},{"timeIndex":3,"countIndex":0,"angle":3.9261056405812305,"position":[413.09770916106834,500.97848369544334],"velocity":[-0.10848274185112947,-0.1082908589241613],"direction":[-0.7077324183218061,-0.7064805900068083],"random1":0.4179578856290207,"random2":0.7207983433693833},{"timeIndex":4,"countIndex":0,"angle":5.176802460696724,"position":[422.55217438458993,504.50549879229584],"velocity":[0.07332681949751975,-0.14637327385048074],"direction":[0.4478984804000166,-0.8940844206535287],"random1":0.33937594969537715,"random2":0.907911808524801},{"timeIndex":5,"countIndex":0,"angle":6.053061169483236,"position":[424.0750421397933,505.78259345521377],"velocity":[0.16096717300131555,-0.037710473302172136],"direction":[0.9736380868986749,-0.22809839048158195],"random1":0.6639886147608461,"random2":0.004788807594355789},{"timeIndex":6,"countIndex":0,"angle":6.810395344059559,"position":[419.1289645039275,507.20896468717405],"velocity":[0.13805718618499888,0.08037349280676177],"direction":[0.8642141300656057,0.5031241769135613],"random1":0.12516974099060874,"random2":0.16225449493924057},{"timeIndex":7,"countIndex":0,"angle":1.7825853164385685,"position":[417.9616478270672,507.38301256803555],"velocity":[-0.036560300368043946,0.17003729305470644],"direction":[-0.21020925250423222,0.9776564172354273],"random1":0.5547552347077854,"random2":0.5165479877980903},{"timeIndex":8,"countIndex":0,"angle":2.5357290659168807,"position":[422.06393606757734,505.02124838191287],"velocity":[-0.1549615053021853,0.10735416619968025],"direction":[-0.8220106150712576,0.5694721667563506],"random1":0.5499927845711738,"random2":0.8420466046968811}],
    "time": {
      "from": 0,
      "to": 850,
      "step": 40
    },
    "heads":[{"time":848,"result":[{"trigger":true,"angleFrom":2.7168146928204138,"angleTo":3.7168146928204138,"p":0.4800000000000004,"angle":3.196814692820414}]}]
  },
  {
    "desc": "randomness2",
    "spawner": {
      "initialTime": 0,
      "speed": 100,
      "pos": [420, 507],
      "rot": 1,
      "ang": 1,
      "vel": 0.2,
      "randPos": 10,
      "randAng": 0.5,
      "randVel": 0.1,
      "seed": "bar"
    },
    "expected": [{"timeIndex":1,"countIndex":0,"angle":2.2213801033428195,"position":[422.8944033755387,510.3711619960439],"velocity":[-0.09248119975060713,0.12150577586157495],"direction":[-0.6056510376391522,0.7957303692876239],"random1":0.7928456784789926,"random2":0.050236122528062664},{"timeIndex":2,"countIndex":0,"angle":3.1204210016631633,"position":[424.15474522651306,510.58575803919297],"velocity":[-0.22580789157325454,0.004781440513149282],"direction":[-0.9997758889488096,0.021170070302608857],"random1":0.8690685988085374,"random2":0.459155393725945},{"timeIndex":3,"countIndex":0,"angle":3.958643221972954,"position":[418.3802332443959,504.38104308786836],"velocity":[-0.10853537251259153,-0.11563321806915891],"direction":[-0.6843747014186781,-0.7291304876756253],"random1":0.22331193917436304,"random2":0.7129774118935177},{"timeIndex":4,"countIndex":0,"angle":4.933509438975662,"position":[422.0973471783552,504.9174861462549],"velocity":[0.04819385485743738,-0.2143890948695954],"direction":[0.21932293854737211,-0.9756523195416211],"random1":0.7837499008312898,"random2":0.8414072444367208},{"timeIndex":5,"countIndex":0,"angle":5.901156196751039,"position":[425.6698324254783,503.21966227221293],"velocity":[0.2037300937368592,-0.08185211995431746],"direction":[0.9279100857105849,-0.37280406762343],"random1":0.9215949882565126,"random2":0.6983725017592062},{"timeIndex":6,"countIndex":0,"angle":7.058989049917527,"position":[419.5847951325697,511.50314251293275],"velocity":[0.11027970159112793,0.10818360837905257],"direction":[0.7138584116434672,0.7002900599936187],"random1":0.12840006273351282,"random2":0.6020610572361256},{"timeIndex":7,"countIndex":0,"angle":1.730881188278628,"position":[417.7602070347945,510.1985195092073],"velocity":[-0.03540669801092886,0.21928196045481368],"direction":[-0.1594019836125299,0.9872137598415],"random1":0.024293329173620013,"random2":0.38768529403633617},{"timeIndex":8,"countIndex":0,"angle":2.9528788961316117,"position":[415.624813028422,511.2716739538583],"velocity":[-0.23857701656300687,0.04556495358561291],"direction":[-0.9822463410718578,0.18759564347539526],"random1":0.67521345277498,"random2":0.7717075600263894}],
    "time": {
      "from": 0,
      "to": 850,
      "step": 40
    },
    "heads":[
      {"time":848,"result":[{"trigger":true,"angleFrom":2.7168146928204138,"angleTo":3.7168146928204138,"p":0.4800000000000004,"angle":3.196814692820414}]},
      {"time":850,"result":[{"trigger":true,"angleFrom":2.7168146928204138,"angleTo":3.7168146928204138,"p":0.5,"angle":3.2168146928204138}]}
    ]
  },
  {
    "desc": "count",
    "spawner": {
      "initialTime": 100,
      "speed": 200,
      "pos": [410, 7],
      "count": 3,
      "rot": 1,
      "ang": 1,
      "vel": 0.4,
      "randPos": 5,
      "randAng": 0.5,
      "randVel": 0.1,
      "seed": "bar"
    },
    "expected": [{"timeIndex":2,"countIndex":0,"angle":7.120421001663163,"position":[443.44059822193157,43.588701502185515],"velocity":[0.28512023280613674,0.31632565893262765],"direction":[0.6695186941354949,0.7427952060986268],"random1":0.8690685988085374,"random2":0.459155393725945},{"timeIndex":2,"countIndex":1,"angle":1.4930051464240577,"position":[415.2165327865643,46.971641701656324],"velocity":[0.028750307345108323,0.368837314793316],"direction":[0.07771274563707341,0.9969757916647463],"random1":0.08570084345574992,"random2":0.15093959546144858},{"timeIndex":2,"countIndex":2,"angle":2.6848013749212103,"position":[372.5351598138308,27.29747072495997],"velocity":[-0.36098555282452277,0.17740950282492093],"direction":[-0.8974723880157889,0.4410706437173498],"random1":0.9797574528339547,"random2":0.8055721147035279},{"timeIndex":3,"countIndex":0,"angle":3.675457914793368,"position":[354.7110047909971,-25.99847009102035],"velocity":[-0.3086914753129266,-0.18247402119803396],"direction":[-0.8608466117033413,-0.5088645312053854],"random1":0.22331193917436304,"random2":0.7129774118935177},{"timeIndex":3,"countIndex":1,"angle":4.484962736629086,"position":[392.95657933599017,-65.75108441569388],"velocity":[-0.09357418057968503,-0.4043301493310299],"direction":[-0.22547079125142183,-0.9742499280433423],"random1":0.3606142642190843,"random2":0.763397350820065},{"timeIndex":3,"countIndex":2,"angle":5.950461578742011,"position":[468.9874456743658,-12.245258078519768],"velocity":[0.3348347226512715,-0.11570917065887963],"direction":[0.9451562302098563,-0.3266185856553378],"random1":0.9720062118344145,"random2":0.965774746574383},{"timeIndex":4,"countIndex":0,"angle":6.650324131796076,"position":[473.7314009691215,30.064965308704245],"velocity":[0.39176704612464947,0.15066388897235503],"direction":[0.9333581732020865,0.3589464034042741],"random1":0.7837499008312898,"random2":0.8414072444367208},{"timeIndex":4,"countIndex":1,"angle":1.561745822993178,"position":[409.19957545259626,66.82536617273063],"velocity":[0.0033001515460404683,0.3646273744454962],"direction":[0.009050380245321373,0.9999590444700298],"random1":0.07098440391246344,"random2":0.1743404299781611},{"timeIndex":4,"countIndex":2,"angle":2.366499683670731,"position":[359.8860465988991,58.73669183831024],"velocity":[-0.31624989199796727,0.309798117742829],"direction":[-0.7143559784216179,0.6997824919882555],"random1":0.463117756790722,"random2":0.08086624001345179}],
    "time": {
      "from": 330,
      "to": 1000,
      "step": 90
    },
    "heads":[
      {"time":1004,"result":[{"trigger":true,"angleFrom":0.43362938564082754,"angleTo":3.4336293856408275,"p":0.5199999999999996,"angle":1.9936293856408263},{"trigger":true,"angleFrom":1.4336293856408275,"angleTo":4.4336293856408275,"p":0.5199999999999996,"angle":2.9936293856408263},{"trigger":true,"angleFrom":2.4336293856408275,"angleTo":5.4336293856408275,"p":0.5199999999999996,"angle":3.9936293856408263}]}
    ]
  }
];
