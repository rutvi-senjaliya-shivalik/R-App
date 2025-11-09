import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import PaymentScreenStyles from './styles/paymentScreenStyles';
import { useTranslation } from '../../../context/LanguageContext';

const PaymentScreen = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const bill = props.route?.params?.bill;
  const event = props.route?.params?.event;
  const paymentType = props.route?.params?.type || 'bill'; // 'bill' or 'event'
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'razorpay' | 'stripe' | 'paytm' | null
  >(null);

  useEffect(() => {
    isMountedRef.current = true;
    if (paymentType === 'bill' && !bill) {
      Alert.alert(t('common.error'), t('smartSociety.billInformationNotFound'), [
        { text: t('common.ok'), onPress: () => props.navigation?.goBack() },
      ]);
    }
    if (paymentType === 'event' && !event) {
      Alert.alert(t('common.error'), t('smartSociety.eventInformationNotFound'), [
        { text: t('common.ok'), onPress: () => props.navigation?.goBack() },
      ]);
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [bill, event, paymentType]);

  if (paymentType === 'bill' && !bill) {
    return null;
  }
  if (paymentType === 'event' && !event) {
    return null;
  }

  // Determine payment details based on type
  const paymentData = paymentType === 'event' ? {
    id: event.id,
    title: event.title,
    total: event.amount || 0,
    period: `${event.date} ${event.time}`,
    flatNo: 'A-101', // TODO: Get from user profile
    charges: {
      eventFee: event.amount || 0,
    },
  } : bill;

  const paymentMethods = [
    { id: 'razorpay', name: 'Razorpay', icon: '💳' },
    { id: 'stripe', name: 'Stripe', icon: '💳' },
    { id: 'paytm', name: 'Paytm', icon: '📱' },
  ];

  const handlePayment = async () => {
    if (!isMountedRef.current) return;

    if (!selectedPaymentMethod) {
      Alert.alert(t('common.error'), t('smartSociety.pleaseSelectPaymentMethod'));
      return;
    }

    setLoading(true);
    try {
      // TODO: Integrate actual payment gateway
      // For now, simulate payment processing
      const paymentAmount = paymentType === 'event' ? event.amount : bill.total;
      const paymentId = paymentType === 'event' ? event.id : bill.id;
      
      console.log('Processing payment:', {
        type: paymentType,
        id: paymentId,
        amount: paymentAmount,
        method: selectedPaymentMethod,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate payment receipt
      const receiptData = {
        id: paymentId,
        amount: paymentAmount,
        paymentMethod: selectedPaymentMethod,
        paymentDate: new Date().toISOString(),
        transactionId: `TXN${Date.now()}`,
        status: 'success',
      };

      if (paymentType === 'event') {
        // Update event payment status
        // TODO: Update event payment status via API
        Alert.alert(
          t('common.success'),
          t('smartSociety.eventPaymentSuccessful'),
          [
            {
              text: t('common.ok'),
              onPress: () => {
                props.navigation?.navigate('EventDetail', {
                  event: { ...event, payments: { ...event.payments, 'mem123': true } },
                  selectedRole: props.route?.params?.selectedRole,
                });
              },
            },
          ],
        );
      } else {
        // Navigate to receipt screen for bills
        props.navigation?.navigate('ReceiptScreen', {
          bill: { ...bill, status: 'paid', paymentData: receiptData },
        });
      }
    } catch (error) {
      Alert.alert(t('smartSociety.paymentFailed'), t('smartSociety.pleaseTryAgainOrContactSupport'));
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      <HeaderComponent
        Title={paymentType === 'event' ? t('smartSociety.eventPayment') : t('smartSociety.payment')}
        onPress={() => props.navigation?.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={PaymentScreenStyles.keyboardView}
      >
        <ScrollView
          style={PaymentScreenStyles.container}
          contentContainerStyle={PaymentScreenStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Payment Summary */}
          <View style={PaymentScreenStyles.billSummaryCard}>
            <Text style={PaymentScreenStyles.summaryTitle}>
              {paymentType === 'event' ? t('smartSociety.eventPaymentSummary') : t('smartSociety.billSummary')}
            </Text>
            {paymentType === 'event' ? (
              <>
                <View style={PaymentScreenStyles.summaryRow}>
                  <Text style={PaymentScreenStyles.summaryLabel}>{t('smartSociety.event')}:</Text>
                  <Text style={PaymentScreenStyles.summaryValue}>
                    {event.title}
                  </Text>
                </View>
                <View style={PaymentScreenStyles.summaryRow}>
                  <Text style={PaymentScreenStyles.summaryLabel}>{t('smartSociety.date')}:</Text>
                  <Text style={PaymentScreenStyles.summaryValue}>
                    {new Date(event.date).toLocaleDateString()} {event.time}
                  </Text>
                </View>
                <View style={PaymentScreenStyles.summaryDivider} />
                <View style={PaymentScreenStyles.chargesSection}>
                  <View style={PaymentScreenStyles.chargeRow}>
                    <Text style={PaymentScreenStyles.chargeLabel}>
                      {t('smartSociety.eventFee')}
                    </Text>
                    <Text style={PaymentScreenStyles.chargeValue}>
                      ₹{event.amount?.toLocaleString() || '0'}
                    </Text>
                  </View>
                </View>
                <View style={PaymentScreenStyles.summaryDivider} />
                <View style={PaymentScreenStyles.totalRow}>
                  <Text style={PaymentScreenStyles.totalLabel}>{t('smartSociety.totalAmount')}</Text>
                  <Text style={PaymentScreenStyles.totalAmount}>
                    ₹{event.amount?.toLocaleString() || '0'}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={PaymentScreenStyles.summaryRow}>
                  <Text style={PaymentScreenStyles.summaryLabel}>{t('smartSociety.billPeriod')}:</Text>
                  <Text style={PaymentScreenStyles.summaryValue}>
                    {bill.period}
                  </Text>
                </View>
                <View style={PaymentScreenStyles.summaryRow}>
                  <Text style={PaymentScreenStyles.summaryLabel}>{t('smartSociety.flatNumber')}:</Text>
                  <Text style={PaymentScreenStyles.summaryValue}>
                    {bill.flatNo}
                  </Text>
                </View>
                <View style={PaymentScreenStyles.summaryDivider} />
                <View style={PaymentScreenStyles.chargesSection}>
                  {bill.charges?.maintenance > 0 && (
                    <View style={PaymentScreenStyles.chargeRow}>
                      <Text style={PaymentScreenStyles.chargeLabel}>
                        {t('smartSociety.maintenance')}
                      </Text>
                      <Text style={PaymentScreenStyles.chargeValue}>
                        ₹{bill.charges.maintenance.toLocaleString()}
                      </Text>
                    </View>
                  )}
                  {bill.charges?.water > 0 && (
                    <View style={PaymentScreenStyles.chargeRow}>
                      <Text style={PaymentScreenStyles.chargeLabel}>{t('smartSociety.water')}</Text>
                      <Text style={PaymentScreenStyles.chargeValue}>
                        ₹{bill.charges.water.toLocaleString()}
                      </Text>
                    </View>
                  )}
                  {bill.charges?.parking > 0 && (
                    <View style={PaymentScreenStyles.chargeRow}>
                      <Text style={PaymentScreenStyles.chargeLabel}>{t('smartSociety.parking')}</Text>
                      <Text style={PaymentScreenStyles.chargeValue}>
                        ₹{bill.charges.parking.toLocaleString()}
                      </Text>
                    </View>
                  )}
                  {bill.charges?.sinkingFund > 0 && (
                    <View style={PaymentScreenStyles.chargeRow}>
                      <Text style={PaymentScreenStyles.chargeLabel}>
                        {t('smartSociety.sinkingFund')}
                      </Text>
                      <Text style={PaymentScreenStyles.chargeValue}>
                        ₹{bill.charges.sinkingFund.toLocaleString()}
                      </Text>
                    </View>
                  )}
                  {bill.charges?.penalty > 0 && (
                    <View style={PaymentScreenStyles.chargeRow}>
                      <Text style={PaymentScreenStyles.chargeLabel}>{t('smartSociety.penalty')}</Text>
                      <Text
                        style={[
                          PaymentScreenStyles.chargeValue,
                          PaymentScreenStyles.penaltyValue,
                        ]}
                      >
                        ₹{bill.charges.penalty.toLocaleString()}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={PaymentScreenStyles.summaryDivider} />
                <View style={PaymentScreenStyles.totalRow}>
                  <Text style={PaymentScreenStyles.totalLabel}>{t('smartSociety.totalAmount')}</Text>
                  <Text style={PaymentScreenStyles.totalAmount}>
                    ₹{bill.total.toLocaleString()}
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Payment Methods */}
          <View style={PaymentScreenStyles.paymentMethodsSection}>
            <Text style={PaymentScreenStyles.sectionTitle}>
              {t('smartSociety.selectPaymentMethod')}
            </Text>
            <View style={PaymentScreenStyles.paymentMethodsList}>
              {paymentMethods.map(method => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    PaymentScreenStyles.paymentMethodCard,
                    selectedPaymentMethod === method.id &&
                      PaymentScreenStyles.paymentMethodCardActive,
                  ]}
                  onPress={() => setSelectedPaymentMethod(method.id as any)}
                  activeOpacity={0.7}
                >
                  <Text style={PaymentScreenStyles.paymentMethodIcon}>
                    {method.icon}
                  </Text>
                  <Text
                    style={[
                      PaymentScreenStyles.paymentMethodName,
                      selectedPaymentMethod === method.id &&
                        PaymentScreenStyles.paymentMethodNameActive,
                    ]}
                  >
                    {method.name}
                  </Text>
                  {selectedPaymentMethod === method.id && (
                    <View style={PaymentScreenStyles.checkmark}>
                      <Text style={PaymentScreenStyles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Payment Button */}
          <View style={PaymentScreenStyles.buttonContainer}>
            <CustomButton
              title={
                loading
                  ? t('smartSociety.processing')
                  : `${t('smartSociety.pay')} ₹${paymentData.total.toLocaleString()}`
              }
              onPress={handlePayment}
              disabled={loading || !selectedPaymentMethod}
              loading={loading}
            />
          </View>

          {/* Security Note */}
          <View style={PaymentScreenStyles.securityNote}>
            <Text style={PaymentScreenStyles.securityNoteText}>
              {t('smartSociety.paymentSecuredEncrypted')}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default PaymentScreen;

