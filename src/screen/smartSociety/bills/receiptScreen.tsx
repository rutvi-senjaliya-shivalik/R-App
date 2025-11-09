import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import {
  Container,
  HeaderComponent,
  CustomButton,
} from '../../../components/common';
import ReceiptScreenStyles from './styles/receiptScreenStyles';
import { useTranslation } from '../../../context/LanguageContext';

const ReceiptScreen = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const bill = props.route?.params?.bill;
  const paymentData = bill?.paymentData;

  useEffect(() => {
    isMountedRef.current = true;
    if (!bill) {
      Alert.alert(
        t('common.error'),
        t('smartSociety.billInformationNotFound'),
        [{ text: t('common.ok'), onPress: () => props.navigation?.goBack() }],
      );
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [bill]);

  if (!bill) {
    return null;
  }

  const handleShareReceipt = async () => {
    if (!isMountedRef.current) return;

    try {
      const receiptText = `Payment Receipt\n\nBill Period: ${
        bill.period
      }\nFlat: ${bill.flatNo}\nAmount: ₹${bill.total}\nTransaction ID: ${
        paymentData?.transactionId || 'N/A'
      }\nPayment Date: ${
        paymentData?.paymentDate
          ? new Date(paymentData.paymentDate).toLocaleDateString()
          : 'N/A'
      }`;

      await Share.share({
        message: receiptText,
        title: 'Payment Receipt',
      });
    } catch (error) {
      console.error('Error sharing receipt:', error);
    }
  };

  const handleDownloadReceipt = () => {
    if (!isMountedRef.current) return;
    // TODO: Implement PDF generation and download
    Alert.alert(
      t('smartSociety.downloadReceipt'),
      t('smartSociety.pdfReceiptDownloadSoon'),
      [{ text: t('common.ok') }],
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.paymentReceipt')}
        onPress={() => props.navigation?.goBack()}
      />
      <ScrollView
        style={ReceiptScreenStyles.container}
        contentContainerStyle={ReceiptScreenStyles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Receipt Header */}
        <View style={ReceiptScreenStyles.receiptHeader}>
          <View style={ReceiptScreenStyles.successIcon}>
            <Text style={ReceiptScreenStyles.successIconText}>✓</Text>
          </View>
          <Text style={ReceiptScreenStyles.successTitle}>
            {t('smartSociety.paymentSuccessful')}
          </Text>
          <Text style={ReceiptScreenStyles.successSubtitle}>
            {t('smartSociety.paymentProcessedSuccessfully')}
          </Text>
        </View>

        {/* Receipt Card */}
        <View style={ReceiptScreenStyles.receiptCard}>
          <View style={ReceiptScreenStyles.receiptHeaderSection}>
            <Text style={ReceiptScreenStyles.receiptTitle}>
              {t('smartSociety.paymentReceipt')}
            </Text>
            <Text style={ReceiptScreenStyles.receiptDate}>
              {paymentData?.paymentDate
                ? new Date(paymentData.paymentDate).toLocaleDateString(
                    'en-IN',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    },
                  )
                : new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
            </Text>
          </View>

          <View style={ReceiptScreenStyles.receiptDivider} />

          {/* Bill Information */}
          <View style={ReceiptScreenStyles.receiptSection}>
            <View style={ReceiptScreenStyles.receiptRow}>
              <Text style={ReceiptScreenStyles.receiptLabel}>
                {t('smartSociety.billPeriod')}:
              </Text>
              <Text style={ReceiptScreenStyles.receiptValue}>
                {bill.period}
              </Text>
            </View>
            <View style={ReceiptScreenStyles.receiptRow}>
              <Text style={ReceiptScreenStyles.receiptLabel}>
                {t('smartSociety.flatNumber')}:
              </Text>
              <Text style={ReceiptScreenStyles.receiptValue}>
                {bill.flatNo}
              </Text>
            </View>
            {paymentData?.transactionId && (
              <View style={ReceiptScreenStyles.receiptRow}>
                <Text style={ReceiptScreenStyles.receiptLabel}>
                  {t('smartSociety.transactionId')}:
                </Text>
                <Text style={ReceiptScreenStyles.receiptValue}>
                  {paymentData.transactionId}
                </Text>
              </View>
            )}
            {paymentData?.paymentMethod && (
              <View style={ReceiptScreenStyles.receiptRow}>
                <Text style={ReceiptScreenStyles.receiptLabel}>
                  {t('smartSociety.payment')} {t('common.method')}:
                </Text>
                <Text style={ReceiptScreenStyles.receiptValue}>
                  {paymentData.paymentMethod.charAt(0).toUpperCase() +
                    paymentData.paymentMethod.slice(1)}
                </Text>
              </View>
            )}
          </View>

          <View style={ReceiptScreenStyles.receiptDivider} />

          {/* Charges Breakdown */}
          <View style={ReceiptScreenStyles.receiptSection}>
            <Text style={ReceiptScreenStyles.chargesTitle}>
              {t('smartSociety.chargesBreakdown')}
            </Text>
            <View style={ReceiptScreenStyles.chargesList}>
              {bill.charges?.maintenance > 0 && (
                <View style={ReceiptScreenStyles.chargeRow}>
                  <Text style={ReceiptScreenStyles.chargeLabel}>
                    {t('smartSociety.maintenance')}
                  </Text>
                  <Text style={ReceiptScreenStyles.chargeValue}>
                    ₹{bill.charges.maintenance.toLocaleString()}
                  </Text>
                </View>
              )}
              {bill.charges?.water > 0 && (
                <View style={ReceiptScreenStyles.chargeRow}>
                  <Text style={ReceiptScreenStyles.chargeLabel}>
                    {t('smartSociety.water')}
                  </Text>
                  <Text style={ReceiptScreenStyles.chargeValue}>
                    ₹{bill.charges.water.toLocaleString()}
                  </Text>
                </View>
              )}
              {bill.charges?.parking > 0 && (
                <View style={ReceiptScreenStyles.chargeRow}>
                  <Text style={ReceiptScreenStyles.chargeLabel}>
                    {t('smartSociety.parking')}
                  </Text>
                  <Text style={ReceiptScreenStyles.chargeValue}>
                    ₹{bill.charges.parking.toLocaleString()}
                  </Text>
                </View>
              )}
              {bill.charges?.sinkingFund > 0 && (
                <View style={ReceiptScreenStyles.chargeRow}>
                  <Text style={ReceiptScreenStyles.chargeLabel}>
                    {t('smartSociety.sinkingFund')}
                  </Text>
                  <Text style={ReceiptScreenStyles.chargeValue}>
                    ₹{bill.charges.sinkingFund.toLocaleString()}
                  </Text>
                </View>
              )}
              {bill.charges?.penalty > 0 && (
                <View style={ReceiptScreenStyles.chargeRow}>
                  <Text style={ReceiptScreenStyles.chargeLabel}>
                    {t('smartSociety.penalty')}
                  </Text>
                  <Text
                    style={[
                      ReceiptScreenStyles.chargeValue,
                      ReceiptScreenStyles.penaltyValue,
                    ]}
                  >
                    ₹{bill.charges.penalty.toLocaleString()}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={ReceiptScreenStyles.receiptDivider} />

          {/* Total Amount */}
          <View style={ReceiptScreenStyles.totalSection}>
            <Text style={ReceiptScreenStyles.totalLabel}>
              {t('smartSociety.totalPaid')}
            </Text>
            <Text style={ReceiptScreenStyles.totalAmount}>
              ₹{bill.total.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={ReceiptScreenStyles.actionButtonsContainer}>
          <TouchableOpacity
            style={ReceiptScreenStyles.shareButton}
            onPress={handleShareReceipt}
            activeOpacity={0.7}
          >
            <Text style={ReceiptScreenStyles.shareButtonText}>
              {t('smartSociety.shareReceipt')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ReceiptScreenStyles.downloadButton}
            onPress={handleDownloadReceipt}
            activeOpacity={0.7}
          >
            <Text style={ReceiptScreenStyles.downloadButtonText}>
              {t('smartSociety.downloadPDF')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={ReceiptScreenStyles.footerNote}>
          <Text style={ReceiptScreenStyles.footerNoteText}>
            {t('smartSociety.digitalReceiptNote')}
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ReceiptScreen;
