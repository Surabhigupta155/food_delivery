import 'package:flutter/material.dart';

class SendOTPScreen extends StatelessWidget {
  //const SendOTPScreen({Key? key}) : super(key: key);
  static const String routeName = '/send-OTP';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => SendOTPScreen(),
      settings: RouteSettings(name: routeName),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: SafeArea(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 30,),
              child: Column(
                children: [
                  Text(
                    "We have sent an OTP to your Mobile Number",
                    style: Theme.of(context).textTheme.headline2,
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Text(
                    "Please check your mobile number 96*****296 to continue to reset your password",
                    style: Theme.of(context).textTheme.headline5,
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(
                    height: 50,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      OTPInput(),
                      OTPInput(),
                      OTPInput(),
                      OTPInput(),
                      OTPInput(),
                      OTPInput(),
                    ],
                  ),
                  SizedBox(height: 20,),
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
                        Navigator.of(context).pushReplacementNamed('/new-password');
                        //Navigator.pushNamed(context, '/send-OTP');
                      },
                      child: Text('Next'),
                    ),
                  ),
                  SizedBox(height: 20,),
                  GestureDetector(
                    onTap: () {
                      //Navigator.of(context).pushReplacementNamed('/signup');
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "Didn't Receive?",
                          style: Theme.of(context).textTheme.headline6,
                        ),
                        Text(
                          "Click Here",
                          style: Theme.of(context).textTheme.headline5!.copyWith(
                              color: Theme.of(context).colorScheme.primary),
                        ),
                      ],
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

class OTPInput extends StatelessWidget {
  const OTPInput({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      margin: const EdgeInsets.only(top: 10, bottom: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(5.0),
      ),
      child: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 13, left: 22),
            child: Text(
              '*',
              style: TextStyle(fontSize: 40, color: Colors.black54),
            ),
          ),
          TextField(
            decoration: InputDecoration(
              border: InputBorder.none,
            ),
          ),
        ],
      ),
    );
  }
}
