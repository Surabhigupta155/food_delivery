import 'package:equatable/equatable.dart';

class Promo extends Equatable {
  final int id;
  final String title;
  final String description;
  final String imageUrl;

  Promo({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
  });

  @override
  List<Object?> get props => [
    id,
    title,
    description,
    imageUrl,
  ];

  static List<Promo> promos = [
    Promo(id: 1, title: 'FREE Delivery on Your First 3 Orders.', description: 'Place an order of \$10 or more and the delivery fee is on us', imageUrl: 'https://media.istockphoto.com/photos/lots-of-multicoloured-cubes-moving-in-space-to-come-together-to-form-picture-id1312818032?b=1&k=20&m=1312818032&s=170667a&w=0&h=1ATbE11tJ8wchBqnCrZVrd0bxnERiT1DtMVS2VufR1I='),
    Promo(id: 2, title: '20% off on Selected Restaurants.', description: 'Get a discount at more than 200+ restaurants', imageUrl: 'https://media.istockphoto.com/photos/lots-of-multicoloured-cubes-moving-in-space-to-come-together-to-form-picture-id1312818032?b=1&k=20&m=1312818032&s=170667a&w=0&h=1ATbE11tJ8wchBqnCrZVrd0bxnERiT1DtMVS2VufR1I='),
  ];

}