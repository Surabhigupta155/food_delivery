import 'package:flutter/material.dart';

class IntroScreen extends StatefulWidget {
  //const IntroScreen({Key? key}) : super(key: key);

  static const String routeName = '/intro';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => IntroScreen(),
      settings: RouteSettings(name: routeName),
    );
  }



  @override
  _IntroScreenState createState() => _IntroScreenState();

}

class _IntroScreenState extends State<IntroScreen> {

  var _controller;
  late int count;
  final List<Map<String, String>> _pages = [
    {
      "image": "logo.png",
      "title": "Find Food You Love",
      "desc": "Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep"
    },
    {
      "image": "logo.png",
      "title": "Fast Delivery",
      "desc": "Fast food delivery to your home, office wherever you are"
    },
    {
      "image": "logo.png",
      "title": "Live Tracking",
      "desc": "Real time tracking of your food on the app once you placed the order"
    },
  ];

  @override
  void initState() {
    _controller = new PageController();
    count = 0;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: SafeArea(
            child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 40,),
                child: Column(
                  children: [
                  Container(
                  height: 400,
                  width: double.infinity,
                  child: PageView.builder(
                    controller: _controller,
                      onPageChanged: (value) {
                      setState(() {
                        count = value;
                      });
                      },
                      itemBuilder: (context, index) {
                        //return Image.asset(_pages[index]["image"]);
                        return Image(image: AssetImage('assets/logo.png'),);
                      },
                      itemCount: _pages.length,
                      ),
                  ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircleAvatar(
                          radius: 5,
                          backgroundColor: count == 0 ? Theme.of(context).colorScheme.primary : Colors.blueGrey,
                        ),
                        SizedBox(width: 5,),
                        CircleAvatar(
                          radius: 5,
                          backgroundColor: count == 1 ? Theme.of(context).colorScheme.primary : Colors.blueGrey,
                        ),
                        SizedBox(width: 5,),
                        CircleAvatar(
                          radius: 5,
                          backgroundColor: count == 2 ? Theme.of(context).colorScheme.primary : Colors.blueGrey,
                        ),
                        SizedBox(width: 5,),

                      ],
                    ),
                    SizedBox(height: 30,),
                    Text(
                        _pages[count]["title"]!,
                      style: Theme.of(context).textTheme.headline5,
                    ),
                    SizedBox(height: 20,),
                    Text(
                        _pages[count]["desc"]!,
                      style: Theme.of(context).textTheme.headline6,
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 50,),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: Theme.of(context).colorScheme.primary,
                          shape: RoundedRectangleBorder(),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 50,
                          ),
                        ),
                        onPressed: () {
                          Navigator.of(context).pushReplacementNamed('/landing');
                          //Navigator.pushNamed(context, '/login');
                        },
                        child: Text('Next'),
                      ),
                    ),
                  ],
                ),
            ),
          ),
      ),
    );
  }


}
