import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:food_delivery_app/models/models.dart';
import 'package:food_delivery_app/widgets/widgets.dart';


class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);
  static const String routeName = '/';

  static Route route() {
    return MaterialPageRoute(
      builder: (_) => HomeScreen(),
      settings: RouteSettings(name: routeName),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: CustomerAppBar(),
      body: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [

            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                height: 100,
                child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    shrinkWrap: true,
                    itemCount: Category.categories.length,
                    itemBuilder: (context, index) {
                      return CategoryBox(category: Category.categories[index]);
                    }),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: SizedBox(
                height: 125,
                child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    shrinkWrap: true,
                    itemCount: Promo.promos.length,
                    itemBuilder: (context, index) {
                      return PromoBox(promo: Promo.promos[index]);
                    }),
              ),
            ),

            FoodSearchBox(),

            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Top Rated',
                  style: Theme.of(context).textTheme.headline4,
                ),
              ),
            ),
            
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ListView.builder(
                  // scrollDirection: Axis.vertical,

                  shrinkWrap: true,
                  itemCount: Restaurant.restaurants.length,
                  itemBuilder: (context, index) {
                    return RestaurantCard(restaurant: Restaurant.restaurants[index]);
                  }
              ),
            ),

          ],
          // child: ElevatedButton(
          //   style: ElevatedButton.styleFrom(primary: Theme.of(context).primaryColor),
          //   child: Text('Location Screen',
          //     style: Theme.of(context)
          //         .textTheme
          //         .headline2?.copyWith(color: Colors.white)
          //   ),
          //   onPressed: () {
          //   Navigator.pushNamed(context, '/location');
          // },),
        ),
      ),
    );
  }
}



class CustomerAppBar extends StatelessWidget with PreferredSizeWidget {
  const CustomerAppBar({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: IconButton(
        icon: Icon(Icons.person),
        onPressed: () {},
      ),
      centerTitle: false,

      title: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
              'CURRENT LOCATION',
              style: Theme.of(context).textTheme.bodyText1!.copyWith(color: Colors.white,),
          ),
          Text('IIT Jammu',
              style: Theme.of(context).textTheme.headline6!.copyWith(color: Colors.white,),
          ),
        ],
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(56.0);
}