import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import BillGenerationStyles from './styles/billGenerationStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

const BillGeneration = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    flatNo: '',
    memberName: '',
    billingPeriod: '',
    maintenance: '',
    water: '',
    parking: '',
    sinkingFund: '',
    penalty: '',
    dueDate: '',
  });

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const calculateTotal = () => {
    const maintenance = parseFloat(formData.maintenance) || 0;
    const water = parseFloat(formData.water) || 0;
    const parking = parseFloat(formData.parking) || 0;
    const sinkingFund = parseFloat(formData.sinkingFund) || 0;
    const penalty = parseFloat(formData.penalty) || 0;
    return maintenance + water + parking + sinkingFund + penalty;
  };

  const handleGenerateBill = async () => {
    if (!isMountedRef.current) return;

    // Validation
    if (!formData.flatNo || !formData.billingPeriod || !formData.dueDate) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.pleaseFillAllRequiredFields'),
      );
      return;
    }

    setLoading(true);
    try {
      // TODO: API call to generate bill
      const billData = {
        flatNo: formData.flatNo,
        memberName: formData.memberName,
        period: formData.billingPeriod,
        charges: {
          maintenance: parseFloat(formData.maintenance) || 0,
          water: parseFloat(formData.water) || 0,
          parking: parseFloat(formData.parking) || 0,
          sinkingFund: parseFloat(formData.sinkingFund) || 0,
          penalty: parseFloat(formData.penalty) || 0,
        },
        total: calculateTotal(),
        dueDate: formData.dueDate,
      };

      // Simulate API call - billData will be sent to API here
      console.log('Generating bill:', billData);
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));

      Alert.alert(
        t('common.success'),
        t('smartSociety.billGeneratedSentSuccessfully'),
        [
          {
            text: t('common.ok'),
            onPress: () => props.navigation?.goBack(),
          },
        ],
      );
    } catch (error) {
      Alert.alert(t('common.error'), t('smartSociety.failedToGenerateBill'));
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.generateBill')}
        onPress={() => props.navigation?.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={BillGenerationStyles.keyboardView}
      >
        <ScrollView
          style={BillGenerationStyles.container}
          contentContainerStyle={BillGenerationStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Member Information */}
          <View style={BillGenerationStyles.section}>
            <Text style={BillGenerationStyles.sectionTitle}>
              {t('smartSociety.memberInformation')}
            </Text>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.flatNumberRequired')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder={t('smartSociety.egA101')}
                value={formData.flatNo}
                onChangeText={value => updateFormData('flatNo', value)}
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.memberName')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder={t('smartSociety.enterMemberName')}
                value={formData.memberName}
                onChangeText={value => updateFormData('memberName', value)}
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.billingPeriod')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder={t('smartSociety.egOctober2025')}
                value={formData.billingPeriod}
                onChangeText={value => updateFormData('billingPeriod', value)}
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.dueDate')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder={t('smartSociety.yyyyMMDD')}
                value={formData.dueDate}
                onChangeText={value => updateFormData('dueDate', value)}
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
          </View>

          {/* Charges Breakdown */}
          <View style={BillGenerationStyles.section}>
            <Text style={BillGenerationStyles.sectionTitle}>
              {t('smartSociety.chargesBreakdown')}
            </Text>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.maintenance')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder="0"
                value={formData.maintenance}
                onChangeText={value => updateFormData('maintenance', value)}
                keyboardType="numeric"
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.water')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder="0"
                value={formData.water}
                onChangeText={value => updateFormData('water', value)}
                keyboardType="numeric"
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.parking')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder="0"
                value={formData.parking}
                onChangeText={value => updateFormData('parking', value)}
                keyboardType="numeric"
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.sinkingFund')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder="0"
                value={formData.sinkingFund}
                onChangeText={value => updateFormData('sinkingFund', value)}
                keyboardType="numeric"
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
            <View style={BillGenerationStyles.inputContainer}>
              <Text style={BillGenerationStyles.label}>
                {t('smartSociety.penaltyIfAny')}
              </Text>
              <TextInput
                style={BillGenerationStyles.input}
                placeholder="0"
                value={formData.penalty}
                onChangeText={value => updateFormData('penalty', value)}
                keyboardType="numeric"
                placeholderTextColor={COLORS.GREY_TEXT}
              />
            </View>
          </View>

          {/* Total Amount */}
          <View style={BillGenerationStyles.totalContainer}>
            <Text style={BillGenerationStyles.totalLabel}>
              {t('smartSociety.totalAmount')}
            </Text>
            <Text style={BillGenerationStyles.totalAmount}>
              ₹{calculateTotal().toFixed(2)}
            </Text>
          </View>

          {/* Generate Button */}
          <View style={BillGenerationStyles.buttonContainer}>
            <CustomButton
              title={
                loading
                  ? t('smartSociety.generating')
                  : t('smartSociety.generateSendBill')
              }
              onPress={handleGenerateBill}
              disabled={loading}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default BillGeneration;
