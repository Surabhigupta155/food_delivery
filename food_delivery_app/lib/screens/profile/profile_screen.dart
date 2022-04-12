// ignore_for_file: prefer_const_literals_to_create_immutables

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:food_delivery_app/screens/EditDetailsScreen/EditDetailsScreen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);
  static const String routeName = '/profile';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => ProfileScreen(),
      settings: RouteSettings(name: routeName),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),actions: [
          IconButton(
            onPressed: (){
              Navigator.push(context, MaterialPageRoute(builder: (context)=>EditDetailsScreen()));
            },
            icon: Icon(Icons.edit),
          ),
      ],
      ),
      body: SingleChildScrollView(
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: 20,
              ),
              Center(
                child: CircleAvatar(
                  radius: 80,
                  backgroundImage: AssetImage('assets/DP.jpg'),
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Center(
                child: Text("Shruti Seth", style: TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.5
                ),),
              ),
              Center(
                child: Text("+91-9999999999",style: TextStyle(
                  fontSize: 15,
                  color: Colors.grey
                ),),
              ),
              AddressColumn(),
              SizedBox(
                height: 20,
              ),
              OrdersColumn()


            ],
          ),
      ),
    );
  }
}

class AddressColumn extends StatelessWidget {
  const AddressColumn({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.grey[300],
          borderRadius: BorderRadius.circular(10)
        ),
        child: SizedBox(
            height: 300,
            width: MediaQuery.of(context).size.width,
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text('ADDRESSES', style: TextStyle(
                      fontSize: 15,
                      letterSpacing: 1.5,
                      fontWeight: FontWeight.bold
                    ),),
                  ),
                  AddressRow(),
                  AddressRow(),
                  AddressRow(),
                  AddressRow(),
                  AddressRow(),
                ],
              ),
            ),
          ),
    ));
  }
}

class AddressRow extends StatelessWidget {
  const AddressRow({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Icon(Icons.location_pin, size: 40,),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Address Alias', style: TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.bold
              ),),
              SizedBox(
                height: 5,
              ),
              Text('Street No, House No., City, State',overflow: TextOverflow.ellipsis,maxLines: 1,style: TextStyle(
                fontSize: 12
              ),)
            ],
          ),
        )
      ],
    );
  }
}

class OrdersColumn extends StatelessWidget {
  const OrdersColumn({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: BoxDecoration(
            color: Colors.red[100],
            borderRadius: BorderRadius.circular(10)
        ),
        child: SizedBox(
          height: 300,
          width: MediaQuery.of(context).size.width,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text('ORDERS', style: TextStyle(
                      fontSize: 15,
                      letterSpacing: 1.5,
                      fontWeight: FontWeight.bold
                  ),),
                ),
                OrdersRow(),
                OrdersRow(),
                OrdersRow(),
                OrdersRow(),
                OrdersRow(),
  ]
      ),
          ),
              )

          ),
    );
  }
}

class OrdersRow extends StatelessWidget {
  const OrdersRow({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Icon(Icons.emoji_food_beverage, size: 40,),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Order Status', style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold
              ),),
              SizedBox(
                height: 5,
              ),
              Text('Chicken Tikka, Pepsi, Spring rolls',overflow: TextOverflow.ellipsis,maxLines: 1,style: TextStyle(
                  fontSize: 12
              ),)
            ],
          ),
        )
      ],
    );
  }
}

