import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect, Line, Polyline, Polygon } from 'react-native-svg';

const { width } = Dimensions.get('window');

// ── Icons ──────────────────────────────────────────────
const BellIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);
const GridIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="7" height="7" stroke="#4ECDC4" strokeWidth="1.8" rx="1" />
    <Rect x="14" y="3" width="7" height="7" stroke="#4ECDC4" strokeWidth="1.8" rx="1" />
    <Rect x="3" y="14" width="7" height="7" stroke="#4ECDC4" strokeWidth="1.8" rx="1" />
    <Rect x="14" y="14" width="7" height="7" stroke="#4ECDC4" strokeWidth="1.8" rx="1" />
  </Svg>
);
const HomeIcon = ({ active }: { active?: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" />
    <Polyline points="9,22 9,12 15,12 15,22" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" />
  </Svg>
);
const MapIcon = ({ active }: { active?: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="8" y1="2" x2="8" y2="18" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" />
    <Line x1="16" y1="6" x2="16" y2="22" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" />
  </Svg>
);
const AlertBellIcon = ({ active }: { active?: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);
const ProfileIcon = ({ active }: { active?: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" />
    <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? '#4ECDC4' : 'rgba(255,255,255,0.4)'} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);
const PlusIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="5" x2="12" y2="19" stroke="#071318" strokeWidth="2.5" strokeLinecap="round" />
    <Line x1="5" y1="12" x2="19" y2="12" stroke="#071318" strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);
const LocationIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
    <Circle cx="12" cy="10" r="3" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
  </Svg>
);
const CheckCircleIcon = () => (
  <Svg width={36} height={36} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="rgba(52,168,83,0.2)" stroke="#34A853" strokeWidth="1.8" />
    <Path d="M9 12l2 2 4-4" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const HazardIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#4ECDC4" strokeWidth="1.8" />
    <Line x1="12" y1="9" x2="12" y2="13" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="12" y1="17" x2="12.01" y2="17" stroke="#4ECDC4" strokeWidth="2.5" strokeLinecap="round" />
  </Svg>
);
const LightIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="5" stroke="#4ECDC4" strokeWidth="1.8" />
    <Line x1="12" y1="1" x2="12" y2="3" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="12" y1="21" x2="12" y2="23" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="1" y1="12" x2="3" y2="12" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="21" y1="12" x2="23" y2="12" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);
const WasteIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Polyline points="3,6 5,6 21,6" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M10 11v6M14 11v6" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);
const RoadsIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M3 21l18-18" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M3 3l18 18" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M12 7l3 3-3 3-3-3z" stroke="#4ECDC4" strokeWidth="1.5" />
  </Svg>
);

// ── Data ───────────────────────────────────────────────
const categories = [
  { label: 'Hazard',   Icon: HazardIcon },
  { label: 'Lighting', Icon: LightIcon  },
  { label: 'Waste',    Icon: WasteIcon  },
  { label: 'Roads',    Icon: RoadsIcon  },
];

const nearbyIssues = [
  {
    id: '1',
    title: 'Large Pothole',
    distance: '200m away',
    status: 'PENDING',
    statusColor: '#F4A261',
    // ✅ road.jpg — pothole image
    image: require('../../assets/images/road1.jpg'),
  },
  {
    id: '2',
    title: 'Broken Streetlight',
    distance: '450m away',
    status: 'FIXING',
    statusColor: '#4ECDC4',
    // ✅ streetlight.jpg — streetlight image
    image: require('../../assets/images/streetlight1.jpg'),
  },
];

// ── Screen ─────────────────────────────────────────────
export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home',    Icon: HomeIcon      },
    { name: 'Map',     Icon: MapIcon       },
    { name: 'Report',  Icon: null          },
    { name: 'Alerts',  Icon: AlertBellIcon },
    { name: 'Profile', Icon: ProfileIcon   },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#0D1F2D', '#0A1820', '#071318']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/images/logo1_1.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>AlertZone</Text>
          </View>
          <TouchableOpacity style={styles.bellWrapper}>
            <BellIcon />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>10</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Hero Banner — uses image3.png ── */}
        <View style={styles.heroBanner}>
          <Image
            source={require('../../assets/images/image3.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(7,19,24,0.3)', 'rgba(7,19,24,0.92)']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Your Voice Builds{'\n'}a Better City.</Text>
            <Text style={styles.heroSubtitle}>
              Report infrastructure issues{'\n'}directly to local authorities.
            </Text>
            <TouchableOpacity style={styles.newReportBtn}>
              <LinearGradient
                colors={['#00D4FF', '#00B8D9']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.newReportBtnInner}
              >
                <Text style={styles.newReportBtnText}>New Report</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewReportsBtn}>
              <Text style={styles.viewReportsBtnText}>ⓘ  View My Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Browse Categories ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <GridIcon />
            <Text style={styles.sectionTitle}>Browse Categories</Text>
          </View>
          <View style={styles.categoriesRow}>
            {categories.map(({ label, Icon }) => (
              <TouchableOpacity key={label} style={styles.categoryItem} activeOpacity={0.75}>
                <View style={styles.categoryIcon}><Icon /></View>
                <Text style={styles.categoryLabel}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Nearby Issues ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Nearby Issues</Text>
            <TouchableOpacity>
              <Text style={styles.viewMapText}>View Map</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.issuesRow}>
            {nearbyIssues.map((issue) => (
              <TouchableOpacity key={issue.id} style={styles.issueCard} activeOpacity={0.85}>
                <View style={styles.issueImageWrapper}>
                  <Image
                    source={issue.image}
                    style={styles.issueImage}
                    resizeMode="cover"
                  />
                  <View style={[styles.issueStatusBadge, { backgroundColor: issue.statusColor }]}>
                    <Text style={styles.issueStatusText}>{issue.status}</Text>
                  </View>
                </View>
                <Text style={styles.issueTitle}>{issue.title}</Text>
                <View style={styles.issueLocation}>
                  <LocationIcon />
                  <Text style={styles.issueDistance}>{issue.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Latest Updates ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Updates</Text>
          <View style={styles.updateCard}>
            <CheckCircleIcon />
            <View style={styles.updateText}>
              <Text style={styles.updateTitle}>Issue Resolved: "Blocked Drain"</Text>
              <Text style={styles.updateMeta}>Main St. • 2 hours ago</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const isReport = tab.name === 'Report';

          if (isReport) {
            return (
              <TouchableOpacity
                key="Report"
                style={styles.reportTab}
                onPress={() => setActiveTab('Report')}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#00D4FF', '#00B8D9']}
                  style={styles.reportTabCircle}
                >
                  <PlusIcon />
                </LinearGradient>
                <Text style={styles.reportTabLabel}>Report</Text>
              </TouchableOpacity>
            );
          }

          const IconComp = tab.Icon!;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.name)}
              activeOpacity={0.7}
            >
              <IconComp active={isActive} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071318' },
  scrollContent: { paddingTop: 56 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerLogo: { width: 32, height: 32 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  bellWrapper: { position: 'relative', padding: 4 },
  badge: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: '#FF4444', borderRadius: 10,
    minWidth: 18, height: 18,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },

  heroBanner: {
    marginHorizontal: 16, borderRadius: 18,
    overflow: 'hidden', height: 230, marginBottom: 24,
  },
  heroImage: {
    position: 'absolute', width: '100%', height: '100%',
  },
  heroContent: {
    flex: 1, padding: 20, justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: 22, fontWeight: '900', color: '#FFFFFF',
    lineHeight: 28, marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13, color: 'rgba(255,255,255,0.75)',
    lineHeight: 18, marginBottom: 16,
  },
  newReportBtn: {
    borderRadius: 25, overflow: 'hidden',
    alignSelf: 'flex-start', marginBottom: 10,
  },
  newReportBtnInner: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 25 },
  newReportBtnText: { color: '#071318', fontSize: 14, fontWeight: '800' },
  viewReportsBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 25, paddingVertical: 8, paddingHorizontal: 18,
  },
  viewReportsBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },

  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionHeaderRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#FFFFFF' },
  viewMapText: { color: '#4ECDC4', fontSize: 14, fontWeight: '600' },

  categoriesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryItem: { alignItems: 'center', gap: 8 },
  categoryIcon: {
    width: 60, height: 60, borderRadius: 16,
    backgroundColor: 'rgba(78,205,196,0.1)',
    borderWidth: 1, borderColor: 'rgba(78,205,196,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  categoryLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },

  issuesRow: { flexDirection: 'row', gap: 12 },
  issueCard: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  issueImageWrapper: { height: 120, position: 'relative' },
  issueImage: { width: '100%', height: '100%' },
  issueStatusBadge: {
    position: 'absolute', top: 8, right: 8,
    borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
  },
  issueStatusText: { color: '#071318', fontSize: 10, fontWeight: '800' },
  issueTitle: {
    color: '#FFFFFF', fontSize: 13, fontWeight: '700',
    padding: 10, paddingBottom: 4,
  },
  issueLocation: {
    flexDirection: 'row', alignItems: 'center',
    gap: 4, paddingHorizontal: 10, paddingBottom: 10,
  },
  issueDistance: { color: 'rgba(255,255,255,0.45)', fontSize: 11 },

  updateCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  updateText: { flex: 1 },
  updateTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  updateMeta: { color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 2 },

  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(10,24,32,0.97)',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)',
    paddingBottom: 24, paddingTop: 10, paddingHorizontal: 8,
  },
  tabItem: { flex: 1, alignItems: 'center', gap: 4 },
  tabLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 10 },
  tabLabelActive: { color: '#4ECDC4' },
  reportTab: { flex: 1, alignItems: 'center', gap: 4 },
  reportTabCircle: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
    marginTop: -24,
    shadowColor: '#00D4FF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5, shadowRadius: 10, elevation: 12,
  },
  reportTabLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
});