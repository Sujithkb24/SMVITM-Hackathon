import 'package:flutter/material.dart';
import 'package:frontend/pages/signup.dart';
import 'pages/homepage.dart';

void main() {
  print('');
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false, // optional
      title: 'Karmic Canteen',
      theme: ThemeData(
        primarySwatch: Colors.deepOrange,
      ),
      home: const RegisterPage(),
    );
  }
}
