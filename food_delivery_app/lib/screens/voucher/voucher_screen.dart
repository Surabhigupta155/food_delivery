import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:food_delivery_app/blocs/basket/basket_bloc.dart';
import 'package:food_delivery_app/models/models.dart';


class VoucherScreen extends StatelessWidget {
  //const LocationScreen({Key? key}) : super(key: key);
  static const String routeName = '/voucher';

  static Route route() {
    return MaterialPageRoute(
        builder: (_) => VoucherScreen(),
    settings: RouteSettings(name: routeName),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
        title: Text(
          'Voucher',
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Container(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  primary: Theme.of(context).colorScheme.secondary,
                  shape: RoundedRectangleBorder(),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 50,
                  ),
                ),
                onPressed: () {
                },
                child: Text('Apply'),
              ),
            ],
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Enter a Voucher Code',
              style: Theme.of(context).textTheme.headline4!.copyWith(
                color: Theme.of(context).colorScheme.secondary,
              ),
            ),
            Container(
              width: double.infinity,
              margin: const EdgeInsets.only(top: 10, bottom: 10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(5.0),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(child: TextFormField(
                    decoration: InputDecoration(
                      hintText: 'Voucher Code',
                      contentPadding: const EdgeInsets.all(10)
                    ),
                  ),),
                ],
              ),
            ),
            Text(
              'Your Vouchers',
              style: Theme.of(context).textTheme.headline4!.copyWith(
                color: Theme.of(context).colorScheme.secondary,
              ),
            ),
            ListView.builder(
              itemCount: Voucher.vouchers.length,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                return Container(
                  width: double.infinity,
                  margin: const EdgeInsets.only(top: 5, bottom: 5),
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(5.0),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                          '1x',
                        style: Theme.of(context).textTheme.headline6!.copyWith(
                          color: Theme.of(context).colorScheme.secondary,
                        ),
                      ),
                      SizedBox(width: 20,),
                      Expanded(
                          child: Text(
                            Voucher.vouchers[index].code,
                            style: Theme.of(context).textTheme.headline6,
                          )
                      ),
                      BlocBuilder<BasketBloc, BasketState>(
                        builder: (context, state) {
                          return TextButton(
                              onPressed: () {
                                context.read<BasketBloc>()
                                    .add(AddVoucher(Voucher.vouchers[index]));
                                Navigator.pop(context);
                              },
                              child: Text('Apply')
                          );
                        }
                      ),
                    ],
                  ),
                );
              }
            ),

          ],
        ),
      ),
    );
  }
}