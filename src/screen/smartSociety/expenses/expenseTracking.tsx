import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import ExpenseTrackingStyles from './styles/expenseTrackingStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

const ExpenseTracking = (props: any) => {
  const { t, language } = useTranslation();
  const isMountedRef = useRef(true);
  const viewOnly = props.route?.params?.viewOnly || false;
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    amount: '',
    date: '',
    vendor: '',
    notes: '',
  });

  // Map language codes to locale codes for date formatting
  const locale = useMemo(() => {
    const localeMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      gu: 'gu-IN',
    };
    return localeMap[language] || 'en-IN';
  }, [language]);

  useEffect(() => {
    isMountedRef.current = true;
    // TODO: Fetch expenses from API
    const mockExpenses = [
      {
        id: 'exp001',
        category: 'Repair',
        title: 'Lift Maintenance',
        amount: 3500,
        date: '2025-11-15',
        vendor: 'Star Elevators',
        notes: 'Monthly service and inspection',
      },
      {
        id: 'exp002',
        category: 'Cleaning',
        title: 'Common Area Cleaning',
        amount: 2500,
        date: '2025-11-10',
        vendor: 'CleanPro Services',
        notes: 'Weekly deep cleaning of lobby and corridors',
      },
      {
        id: 'exp003',
        category: 'Security',
        title: 'Security Guard Services',
        amount: 15000,
        date: '2025-11-01',
        vendor: 'SecureGuard Pvt Ltd',
        notes: 'Monthly salary for security personnel',
      },
      {
        id: 'exp004',
        category: 'Utilities',
        title: 'Electricity Bill - Common Areas',
        amount: 8500,
        date: '2025-11-05',
        vendor: 'State Electricity Board',
        notes: 'October month electricity bill',
      },
      {
        id: 'exp005',
        category: 'Repair',
        title: 'Water Pump Repair',
        amount: 4200,
        date: '2025-10-28',
        vendor: 'AquaTech Solutions',
        notes: 'Emergency repair of main water pump',
      },
      {
        id: 'exp006',
        category: 'Cleaning',
        title: 'Garden Maintenance',
        amount: 1800,
        date: '2025-10-25',
        vendor: 'GreenLand Gardeners',
        notes: 'Monthly garden maintenance and plant care',
      },
      {
        id: 'exp007',
        category: 'Utilities',
        title: 'Water Supply Charges',
        amount: 3200,
        date: '2025-10-20',
        vendor: 'Municipal Water Department',
        notes: 'Monthly water supply charges',
      },
      {
        id: 'exp008',
        category: 'Security',
        title: 'CCTV Camera Installation',
        amount: 25000,
        date: '2025-10-12',
        vendor: 'SecureVision Systems',
        notes: 'Installation of new CCTV cameras in parking area',
      },
      {
        id: 'exp009',
        category: 'Repair',
        title: 'Gate Automation Repair',
        amount: 5500,
        date: '2025-10-08',
        vendor: 'AutoGate Solutions',
        notes: 'Repair of main gate automation system',
      },
      {
        id: 'exp010',
        category: 'Miscellaneous',
        title: 'Festival Decoration',
        amount: 5000,
        date: '2025-10-05',
        vendor: 'Event Decorators',
        notes: 'Diwali decoration for common areas',
      },
      {
        id: 'exp011',
        category: 'Cleaning',
        title: 'Tank Cleaning Service',
        amount: 3000,
        date: '2025-09-30',
        vendor: 'AquaClean Services',
        notes: 'Annual water tank cleaning',
      },
      {
        id: 'exp012',
        category: 'Utilities',
        title: 'Internet Connection - Office',
        amount: 1500,
        date: '2025-09-25',
        vendor: 'Broadband Services',
        notes: 'Monthly internet charges for society office',
      },
      {
        id: 'exp013',
        category: 'Repair',
        title: 'Intercom System Repair',
        amount: 2800,
        date: '2025-09-20',
        vendor: 'TechComm Solutions',
        notes: 'Repair of intercom system in multiple flats',
      },
      {
        id: 'exp014',
        category: 'Security',
        title: 'Security Equipment Maintenance',
        amount: 3500,
        date: '2025-09-15',
        vendor: 'SecureGuard Pvt Ltd',
        notes: 'Quarterly maintenance of security equipment',
      },
      {
        id: 'exp015',
        category: 'Miscellaneous',
        title: 'Legal Consultation',
        amount: 8000,
        date: '2025-09-10',
        vendor: 'Legal Advisors',
        notes: 'Legal consultation for property matters',
      },
    ];
    setExpenses(mockExpenses);
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const categories = useMemo(
    () => [
      t('smartSociety.repair'),
      t('smartSociety.cleaning'),
      t('smartSociety.security'),
      t('smartSociety.utilities'),
      t('smartSociety.miscellaneous'),
    ],
    [t],
  );

  const handleAddExpense = async () => {
    if (!isMountedRef.current) return;

    // Validation
    if (
      !formData.title ||
      !formData.category ||
      !formData.amount ||
      !formData.date
    ) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.pleaseFillAllRequiredFields'),
      );
      return;
    }

    setLoading(true);
    try {
      // TODO: API call to add expense
      const expenseData = {
        id: `exp${Date.now()}`,
        ...formData,
        amount: parseFloat(formData.amount),
        // proofUrl: '', // TODO: Handle image upload
      };

      // Simulate API call
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));

      setExpenses(prev => [expenseData, ...prev]);
      setFormData({
        title: '',
        category: '',
        amount: '',
        date: '',
        vendor: '',
        notes: '',
      });
      setShowAddForm(false);
      Alert.alert(
        t('common.success'),
        t('smartSociety.expenseAddedSuccessfully'),
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('smartSociety.failedToAddExpense'));
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getTotalExpense = () => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  // Translate category value (handles both English keys and translated values)
  const getTranslatedCategory = useCallback(
    (category: string) => {
      // Category mapping for backward compatibility with mock data
      const categoryMap: Record<string, string> = {
        Repair: t('smartSociety.repair'),
        Cleaning: t('smartSociety.cleaning'),
        Security: t('smartSociety.security'),
        Utilities: t('smartSociety.utilities'),
        Miscellaneous: t('smartSociety.miscellaneous'),
      };

      // If it's a known English category, translate it
      if (categoryMap[category]) {
        return categoryMap[category];
      }

      // If it's already translated (matches one of our translated categories), return as is
      if (categories.includes(category)) {
        return category;
      }

      // Fallback: try to find matching category or return original
      return category;
    },
    [t, categories],
  );

  const renderExpenseItem = ({ item }: any) => {
    return (
      <View style={ExpenseTrackingStyles.expenseCard}>
        <View style={ExpenseTrackingStyles.expenseHeader}>
          <View style={ExpenseTrackingStyles.expenseHeaderLeft}>
            <Text style={ExpenseTrackingStyles.expenseTitle}>{item.title}</Text>
            <Text style={ExpenseTrackingStyles.expenseCategory}>
              {getTranslatedCategory(item.category)}
            </Text>
          </View>
          <Text style={ExpenseTrackingStyles.expenseAmount}>
            ₹{item.amount}
          </Text>
        </View>
        {item.vendor && (
          <Text style={ExpenseTrackingStyles.expenseVendor}>
            {t('smartSociety.vendorLabel')}: {item.vendor}
          </Text>
        )}
        {item.notes && (
          <Text style={ExpenseTrackingStyles.expenseNotes}>{item.notes}</Text>
        )}
        <Text style={ExpenseTrackingStyles.expenseDate}>
          {new Date(item.date).toLocaleDateString(locale)}
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={
          viewOnly
            ? t('smartSociety.expenseReports')
            : t('smartSociety.expenseTracking')
        }
        onPress={() => props.navigation?.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={ExpenseTrackingStyles.keyboardView}
      >
        <ScrollView
          style={ExpenseTrackingStyles.container}
          contentContainerStyle={ExpenseTrackingStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Card */}
          <View style={ExpenseTrackingStyles.summaryCard}>
            <Text style={ExpenseTrackingStyles.summaryLabel}>
              {t('smartSociety.totalExpenses')}
            </Text>
            <Text style={ExpenseTrackingStyles.summaryAmount}>
              ₹{getTotalExpense().toFixed(2)}
            </Text>
            <Text style={ExpenseTrackingStyles.summaryCount}>
              {expenses.length}{' '}
              {expenses.length === 1
                ? t('smartSociety.expense')
                : t('smartSociety.expenses')}
            </Text>
          </View>

          {/* Add Expense Button - Only show if not view-only */}
          {!viewOnly && (
            <TouchableOpacity
              style={ExpenseTrackingStyles.addButton}
              onPress={() => setShowAddForm(!showAddForm)}
            >
              <Text style={ExpenseTrackingStyles.addButtonText}>
                {showAddForm
                  ? t('common.cancel')
                  : t('smartSociety.addNewExpense')}
              </Text>
            </TouchableOpacity>
          )}

          {/* Add Expense Form - Only show if not view-only */}
          {!viewOnly && showAddForm && (
            <View style={ExpenseTrackingStyles.formContainer}>
              <Text style={ExpenseTrackingStyles.formTitle}>
                {t('smartSociety.addNewExpenseTitle')}
              </Text>
              <View style={ExpenseTrackingStyles.inputContainer}>
                <Text style={ExpenseTrackingStyles.label}>
                  {t('smartSociety.title')}
                </Text>
                <TextInput
                  style={ExpenseTrackingStyles.input}
                  placeholder={t('smartSociety.egLiftRepair')}
                  value={formData.title}
                  onChangeText={value => updateFormData('title', value)}
                  placeholderTextColor={COLORS.GREY_TEXT}
                />
              </View>
              <View style={ExpenseTrackingStyles.inputContainer}>
                <Text style={ExpenseTrackingStyles.label}>
                  {t('smartSociety.category')}
                </Text>
                <View style={ExpenseTrackingStyles.categoryContainer}>
                  {categories.map(cat => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        ExpenseTrackingStyles.categoryChip,
                        formData.category === cat &&
                          ExpenseTrackingStyles.categoryChipActive,
                      ]}
                      onPress={() => updateFormData('category', cat)}
                    >
                      <Text
                        style={[
                          ExpenseTrackingStyles.categoryChipText,
                          formData.category === cat &&
                            ExpenseTrackingStyles.categoryChipTextActive,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={ExpenseTrackingStyles.inputContainer}>
                <Text style={ExpenseTrackingStyles.label}>
                  {t('smartSociety.amount')}
                </Text>
                <TextInput
                  style={ExpenseTrackingStyles.input}
                  placeholder="0"
                  value={formData.amount}
                  onChangeText={value => updateFormData('amount', value)}
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.GREY_TEXT}
                />
              </View>
              <View style={ExpenseTrackingStyles.inputContainer}>
                <Text style={ExpenseTrackingStyles.label}>
                  {t('smartSociety.date')}
                </Text>
                <TextInput
                  style={ExpenseTrackingStyles.input}
                  placeholder={t('smartSociety.yyyyMMDD')}
                  value={formData.date}
                  onChangeText={value => updateFormData('date', value)}
                  placeholderTextColor={COLORS.GREY_TEXT}
                />
              </View>
              <View style={ExpenseTrackingStyles.inputContainer}>
                <Text style={ExpenseTrackingStyles.label}>
                  {t('smartSociety.vendor')}
                </Text>
                <TextInput
                  style={ExpenseTrackingStyles.input}
                  placeholder={t('smartSociety.vendorNamePlaceholder')}
                  value={formData.vendor}
                  onChangeText={value => updateFormData('vendor', value)}
                  placeholderTextColor={COLORS.GREY_TEXT}
                />
              </View>
              <View style={ExpenseTrackingStyles.inputContainer}>
                <Text style={ExpenseTrackingStyles.label}>
                  {t('smartSociety.notes')}
                </Text>
                <TextInput
                  style={[
                    ExpenseTrackingStyles.input,
                    ExpenseTrackingStyles.textArea,
                  ]}
                  placeholder={t('smartSociety.additionalNotesPlaceholder')}
                  value={formData.notes}
                  onChangeText={value => updateFormData('notes', value)}
                  multiline
                  numberOfLines={3}
                  placeholderTextColor={COLORS.GREY_TEXT}
                />
              </View>
              <View style={ExpenseTrackingStyles.buttonContainer}>
                <CustomButton
                  title={
                    loading
                      ? t('smartSociety.adding')
                      : t('smartSociety.addExpense')
                  }
                  onPress={handleAddExpense}
                  disabled={loading}
                  loading={loading}
                />
              </View>
            </View>
          )}

          {/* Expenses List */}
          <View style={ExpenseTrackingStyles.listContainer}>
            <Text style={ExpenseTrackingStyles.listTitle}>
              {t('smartSociety.expenseHistory')}
            </Text>
            {expenses.length > 0 ? (
              <FlatList
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
                contentContainerStyle={ExpenseTrackingStyles.expensesList}
              />
            ) : (
              <View style={ExpenseTrackingStyles.emptyState}>
                <Text style={ExpenseTrackingStyles.emptyStateText}>
                  {t('smartSociety.noExpensesRecordedYet')}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ExpenseTracking;
