import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // Dummy data for meal options with items and descriptions
  final List<Map<String, dynamic>> meals = [
    {
      'name': 'Breakfast',
      'time': '8:00 AM - 10:00 AM',
      'item': 'Masala Dosa with Sambar',
      'description':
          'Crispy rice crepe filled with spiced potato, served with coconut chutney and sambar',
      'icon': Icons.breakfast_dining,
      'selected': null,
    },
    {
      'name': 'Lunch',
      'time': '12:30 PM - 2:30 PM',
      'item': 'Veg Thali',
      'description':
          'Complete meal with dal, sabzi, roti, rice, curd, salad and sweet',
      'icon': Icons.lunch_dining,
      'selected': null,
    },
    {
      'name': 'Snack',
      'time': '4:00 PM - 6:00 PM',
      'item': 'Samosa with Tea',
      'description':
          'Crispy fried pastry with spiced filling, served with mint chutney and masala chai',
      'icon': Icons.fastfood,
      'selected': null,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Karmic Canteen'),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Colors.deepOrange,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Today\'s Menu 🍽️',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Select your meal preferences for today',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey.shade600,
                      ),
                    ),
                    const SizedBox(height: 20),
                    ...List.generate(
                      meals.length,
                      (index) => _buildMealCard(index),
                    ),
                  ],
                ),
              ),
            ),
          ),
          _buildSubmitButton(),
        ],
      ),
    );
  }

  Widget _buildMealCard(int index) {
    final meal = meals[index];
    final isSelected = meal['selected'] != null;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: LinearGradient(
          colors: [
            Colors.deepOrange.shade50,
            Colors.white,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.shade300,
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header section
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border(
                  bottom: BorderSide(color: Colors.grey.shade200),
                ),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.deepOrange.shade100,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(
                      meal['icon'],
                      size: 28,
                      color: Colors.deepOrange,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          meal['name'],
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(
                              Icons.access_time,
                              size: 14,
                              color: Colors.grey.shade600,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              meal['time'],
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey.shade600,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Content section
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    meal['item'],
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    meal['description'],
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey.shade700,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Selection buttons
                  Row(
                    children: [
                      Expanded(
                        child: _buildChoiceButton(
                          index: index,
                          isYes: true,
                          label: 'Yes',
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: _buildChoiceButton(
                          index: index,
                          isYes: false,
                          label: 'No',
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChoiceButton({
    required int index,
    required bool isYes,
    required String label,
  }) {
    final bool isSelected = meals[index]['selected'] == isYes;

    return InkWell(
      onTap: () {
        setState(() {
          meals[index]['selected'] = isYes;
        });
      },
      borderRadius: BorderRadius.circular(12),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color:
              isSelected ? (isYes ? Colors.green : Colors.red) : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? (isYes ? Colors.green : Colors.red)
                : Colors.grey.shade300,
            width: 2,
          ),
        ),
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (isSelected)
                Padding(
                  padding: const EdgeInsets.only(right: 6),
                  child: Icon(
                    isYes ? Icons.check_circle : Icons.cancel,
                    color: Colors.white,
                    size: 18,
                  ),
                ),
              Text(
                label,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: isSelected ? Colors.white : Colors.grey.shade700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSubmitButton() {
    final hasSelections = meals.any((meal) => meal['selected'] != null);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.shade300,
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: hasSelections
                ? () {
                    // Show selection summary - FIX: Handle null safely
                    final selections = meals
                        .where((meal) => meal['selected'] != null)
                        .map((meal) =>
                            '${meal['name']}: ${meal['selected'] == true ? "Yes" : "No"}')
                        .join('\n');

                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('Order Submitted! 🎉'),
                        content: Text('Your preferences:\n\n$selections'),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.pop(context),
                            child: const Text('OK'),
                          ),
                        ],
                      ),
                    );
                  }
                : null,
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.deepOrange,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              elevation: 0,
              disabledBackgroundColor: Colors.grey.shade300,
            ),
            child: Text(
              hasSelections ? 'Submit Order' : 'Make Your Selections',
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
