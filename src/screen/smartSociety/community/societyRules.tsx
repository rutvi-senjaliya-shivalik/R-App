import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Container, HeaderComponent } from '../../../components/common';
import SocietyRulesStyles from './styles/societyRulesStyles';
import { COLORS } from '../../../constants';
import { useTranslation } from '../../../context/LanguageContext';

const SocietyRules = (props: any) => {
  const { t } = useTranslation();
  const isMountedRef = useRef(true);
  const selectedRole = props.route?.params?.selectedRole;
  const [rules, setRules] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    isMountedRef.current = true;
    loadRules();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadRules = () => {
    // TODO: Fetch rules from API
    const mockRules = [
      {
        id: 'rule001',
        title: 'Parking Regulations',
        category: 'parking',
        content: `1. Each flat is allotted one parking space. Additional vehicles require prior approval.
2. Parking in visitor areas is strictly prohibited.
3. Vehicles must display valid parking stickers.
4. Unauthorized vehicles will be towed at owner's expense.
5. No parking in fire lanes or emergency exits.`,
        lastUpdated: '2025-10-15',
      },
      {
        id: 'rule002',
        title: 'Noise Control',
        category: 'general',
        content: `1. Quiet hours are from 10:00 PM to 7:00 AM.
2. Loud music, parties, or construction work is not allowed during quiet hours.
3. Residents must ensure their guests follow noise regulations.
4. Repeated violations may result in penalties.`,
        lastUpdated: '2025-09-20',
      },
      {
        id: 'rule003',
        title: 'Waste Management',
        category: 'maintenance',
        content: `1. Garbage must be disposed of in designated bins only.
2. Segregation of wet and dry waste is mandatory.
3. Large items require prior notice for disposal.
4. No dumping in common areas or stairwells.
5. Follow the waste collection schedule.`,
        lastUpdated: '2025-11-01',
      },
      {
        id: 'rule004',
        title: 'Visitor Management',
        category: 'security',
        content: `1. All visitors must be registered at the security gate.
2. Visitors must carry valid ID proof.
3. Host residents are responsible for their visitors.
4. Visitors must leave by 11:00 PM unless prior approval.
5. Overnight visitors require advance notice.`,
        lastUpdated: '2025-10-10',
      },
      {
        id: 'rule005',
        title: 'Common Area Usage',
        category: 'general',
        content: `1. Common areas must be kept clean and tidy.
2. Booking required for clubhouse, party hall, and gym.
3. Damage to common property will be charged to the resident.
4. Smoking is prohibited in all common areas.
5. Pets must be leashed in common areas.`,
        lastUpdated: '2025-09-15',
      },
      {
        id: 'rule006',
        title: 'Maintenance Charges',
        category: 'finance',
        content: `1. Maintenance charges are due by the 10th of each month.
2. Late payment charges apply after the due date.
3. Payment can be made online or at the office.
4. Receipts must be retained for records.
5. Disputes must be raised within 7 days of billing.`,
        lastUpdated: '2025-10-05',
      },
    ];
    setRules(mockRules);
  };

  const categories = [
    { id: 'all', label: t('common.all') },
    { id: 'general', label: t('smartSociety.general') },
    { id: 'parking', label: t('smartSociety.parking') },
    { id: 'security', label: t('smartSociety.security') },
    { id: 'maintenance', label: t('smartSociety.maintenance') },
    { id: 'finance', label: t('smartSociety.finance') },
  ];

  const filteredRules = rules.filter(rule => {
    if (selectedCategory === 'all') return true;
    return rule.category === selectedCategory;
  });

  const renderRuleCard = ({ item }: any) => {
    return (
      <View style={SocietyRulesStyles.ruleCard}>
        <View style={SocietyRulesStyles.ruleHeader}>
          <View style={SocietyRulesStyles.ruleHeaderLeft}>
            <Text style={SocietyRulesStyles.categoryBadge}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Text>
            <Text style={SocietyRulesStyles.lastUpdated}>
              {t('smartSociety.updated')}: {new Date(item.lastUpdated).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <Text style={SocietyRulesStyles.ruleTitle}>{item.title}</Text>
        <Text style={SocietyRulesStyles.ruleContent}>{item.content}</Text>
      </View>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title={t('smartSociety.societyRules')}
        onPress={() => props.navigation?.goBack()}
      />
      <View style={SocietyRulesStyles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={SocietyRulesStyles.categoryScroll}
          contentContainerStyle={SocietyRulesStyles.categoryScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                SocietyRulesStyles.categoryChip,
                selectedCategory === category.id &&
                  SocietyRulesStyles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  SocietyRulesStyles.categoryChipText,
                  selectedCategory === category.id &&
                    SocietyRulesStyles.categoryChipTextActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredRules}
          renderItem={renderRuleCard}
          keyExtractor={item => item.id}
          contentContainerStyle={SocietyRulesStyles.rulesList}
          ListEmptyComponent={
            <View style={SocietyRulesStyles.emptyState}>
              <Text style={SocietyRulesStyles.emptyStateText}>
                {t('smartSociety.noRulesFound')}
              </Text>
            </View>
          }
        />
      </View>
    </Container>
  );
};

export default SocietyRules;

