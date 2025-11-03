import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  // Change this to your backend URL
  static const String baseUrl = 'http://10.218.211.243:5000';

  // Register Employee
  static Future<Map<String, dynamic>> registerEmployee({
    required String name,
    required String email,
    required String password,
    required String phoneNumber,
  }) async {
    try {
      final url = Uri.parse('$baseUrl/api/employees/register');

      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'name': name,
          'email': email,
          'password': password,
          'phoneNumber': phoneNumber,
        }),
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 201) {
        // Save token and user data in SharedPreferences
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('auth_token', data['token'].toString());
        await prefs.setString('user_id', data['employee']['id'].toString());
        await prefs.setString('user_name', data['employee']['name'].toString());
        await prefs.setString(
            'user_email', data['employee']['email'].toString());
        if (data['employee']['phoneNumber'] != null) {
          await prefs.setString(
              'user_phone', data['employee']['phoneNumber'].toString());
        }
        await prefs.setBool('is_logged_in', true);

        return {
          'success': true,
          'message': data['message'],
          'employee': data['employee'],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Registration failed',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Login Employee
  // Login Employee
  static Future<Map<String, dynamic>> loginEmployee({
    required String email,
    required String password,
  }) async {
    try {
      final url = Uri.parse('$baseUrl/api/employees/login');

      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 200) {
        // Save token and user data in SharedPreferences
        final prefs = await SharedPreferences.getInstance();

        // Convert all values to String using .toString()
        await prefs.setString('auth_token', data['token'].toString());
        await prefs.setString('user_id', data['employee']['id'].toString());
        await prefs.setString('user_name', data['employee']['name'].toString());
        await prefs.setString(
            'user_email', data['employee']['email'].toString());
        if (data['employee']['phoneNumber'] != null) {
          await prefs.setString(
              'user_phone', data['employee']['phoneNumber'].toString());
        }
        await prefs.setBool('is_logged_in', true);

        return {
          'success': true,
          'message': data['message'],
          'employee': data['employee'],
        };
      } else {
        return {
          'success': false,
          'message': data['message'] ?? 'Login failed',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Network error: ${e.toString()}',
      };
    }
  }

  // Get stored token
  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('auth_token');
  }

  // Get user data
  static Future<Map<String, String?>> getUserData() async {
    final prefs = await SharedPreferences.getInstance();
    return {
      'id': prefs.getString('user_id'),
      'name': prefs.getString('user_name'),
      'email': prefs.getString('user_email'),
      'phone': prefs.getString('user_phone'),
    };
  }

  // Check if user is logged in
  static Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('is_logged_in') ?? false;
  }

  // Logout - clear all stored data
  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }
}
