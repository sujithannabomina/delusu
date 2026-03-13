// FILE: firestoreHelpers.js (UPDATED for Phase 3)
// PATH: C:\Users\devav\Desktop\Projects\Delesu\src\firebase\firestoreHelpers.js
// REPLACES: existing firestoreHelpers.js — adds castings & applications functions
 
import { db } from './config';
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, addDoc,
  collection, query, where, orderBy, limit, getDocs,
  serverTimestamp, increment, Timestamp
} from 'firebase/firestore';
 
// ═══════════════════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════════════════
 
export async function getUserDoc(userId) {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
 
export async function createUserDoc(userId, data) {
  const ref = doc(db, 'users', userId);
  await setDoc(ref, {
    email: data.email || '',
    displayName: data.displayName || '',
    photoURL: data.photoURL || '',
    accountType: data.accountType,
    onboardingComplete: false,
    accountStatus: 'incomplete',
    plan: null,
    planCategoryLimit: 0,
    activatedAt: null,
    expiresAt: null,
    isAdmin: false,
    isSuspended: false,
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  });
}
 
export async function updateLastLogin(userId) {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { lastLoginAt: serverTimestamp() });
}
 
export async function completeOnboarding(userId) {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { onboardingComplete: true, accountStatus: 'complete_unpaid' });
}
 
export async function completeOrgOnboarding(userId) {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { onboardingComplete: true, accountStatus: 'active' });
}
 
// ═══════════════════════════════════════════════════════
// ORGANIZATIONS
// ═══════════════════════════════════════════════════════
 
export async function saveOrgProfile(userId, data) {
  const ref = doc(db, 'organizations', userId);
  await setDoc(ref, {
    companyName: data.companyName,
    orgType: data.orgType,
    contactPerson: data.contactPerson,
    designation: data.designation || '',
    phone: data.phone,
    city: data.city,
    state: data.state,
    website: data.website || '',
    about: data.about || '',
    logoURL: data.logoURL || '',
    isVerified: false,
    totalCastingsPosted: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}
 
export async function getOrgProfile(userId) {
  const ref = doc(db, 'organizations', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
 
// ═══════════════════════════════════════════════════════
// TALENT
// ═══════════════════════════════════════════════════════
 
export async function saveTalentProfile(userId, data) {
  const ref = doc(db, 'talent', userId);
  await setDoc(ref, {
    fullName: data.fullName,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    phone: data.phone,
    city: data.city,
    state: data.state,
    height: data.height,
    weightRange: data.weightRange || '',
    bodyType: data.bodyType,
    skinTone: data.skinTone,
    hairColor: data.hairColor,
    eyeColor: data.eyeColor,
    ethnicity: data.ethnicity || '',
    skills: data.skills || [],
    languages: data.languages || [],
    experience: data.experience || '',
    bio: data.bio || '',
    instagramURL: data.instagramURL || '',
    youtubeURL: data.youtubeURL || '',
    photos: data.photos || [],
    profilePhotoURL: data.profilePhotoURL || '',
    selectedCategories: data.selectedCategories || [],
    profileVisible: false,
    totalApplications: 0,
    profileViews: 0,
    parentName: data.parentName || '',
    parentRelation: data.parentRelation || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}
 
export async function getTalentProfile(userId) {
  const ref = doc(db, 'talent', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
 
export async function updateTalentPhotos(userId, photos) {
  const ref = doc(db, 'talent', userId);
  await updateDoc(ref, {
    photos,
    profilePhotoURL: photos.length > 0 ? photos[0] : '',
    updatedAt: serverTimestamp(),
  });
}
 
// ═══════════════════════════════════════════════════════
// CASTINGS (Phase 3)
// ═══════════════════════════════════════════════════════
 
// Create a new casting call (status = 'draft' until payment, or 'active' for now)
export async function createCasting(data) {
  const ref = await addDoc(collection(db, 'castings'), {
    orgId: data.orgId,
    orgName: data.orgName,
    orgVerified: data.orgVerified || false,
    title: data.title,
    description: data.description,
    castingTypeId: data.castingTypeId,
    castingTypeLabel: data.castingTypeLabel,
    castingTier: data.castingTier,
    castingGroup: data.castingGroup,
    ageRange: data.ageRange,
    gender: data.gender,
    location: data.location,
    shootDuration: data.shootDuration || '',
    budget: data.budget,
    deadline: data.deadline, // Firestore Timestamp
    requirements: data.requirements || '',
    preferredHeight: data.preferredHeight || '',
    preferredBodyType: data.preferredBodyType || '',
    preferredSkinTone: data.preferredSkinTone || '',
    preferredSkills: data.preferredSkills || [],
    status: 'active', // For now active immediately. Phase 4 adds payment gate → draft until paid
    applicantCount: 0,
    isFeatured: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
 
  // Increment org's total castings count
  const orgRef = doc(db, 'organizations', data.orgId);
  await updateDoc(orgRef, { totalCastingsPosted: increment(1) });
 
  return ref.id;
}
 
// Get a single casting by ID
export async function getCasting(castingId) {
  const ref = doc(db, 'castings', castingId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
 
// Get all castings by an organization
export async function getOrgCastings(orgId) {
  const q = query(
    collection(db, 'castings'),
    where('orgId', '==', orgId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
 
// Get all active castings (for talent browsing)
export async function getActiveCastings() {
  const q = query(
    collection(db, 'castings'),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
 
// Close a casting (org manually closes)
export async function closeCasting(castingId) {
  const ref = doc(db, 'castings', castingId);
  await updateDoc(ref, { status: 'closed', updatedAt: serverTimestamp() });
}
 
// Check and expire castings past deadline (called on page load)
export async function expireOldCastings() {
  const now = Timestamp.now();
  const q = query(
    collection(db, 'castings'),
    where('status', '==', 'active'),
    where('deadline', '<', now)
  );
  const snap = await getDocs(q);
  const promises = snap.docs.map(d =>
    updateDoc(doc(db, 'castings', d.id), { status: 'expired', updatedAt: serverTimestamp() })
  );
  await Promise.all(promises);
  return snap.size; // number expired
}
 
// ═══════════════════════════════════════════════════════
// APPLICATIONS (Phase 3)
// ═══════════════════════════════════════════════════════
 
// Talent applies to a casting
export async function applyToCasting(data) {
  // Check for duplicate
  const dupQ = query(
    collection(db, 'applications'),
    where('talentId', '==', data.talentId),
    where('castingId', '==', data.castingId)
  );
  const dupSnap = await getDocs(dupQ);
  if (!dupSnap.empty) {
    throw new Error('ALREADY_APPLIED');
  }
 
  // Create application
  const ref = await addDoc(collection(db, 'applications'), {
    castingId: data.castingId,
    castingTitle: data.castingTitle,
    talentId: data.talentId,
    talentName: data.talentName,
    talentPhoto: data.talentPhoto || '',
    talentCity: data.talentCity || '',
    talentAge: data.talentAge || '',
    talentGender: data.talentGender || '',
    talentCategories: data.talentCategories || [],
    orgId: data.orgId,
    status: 'applied', // applied → shortlisted → selected OR applied → rejected
    appliedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
 
  // Increment applicant count on casting
  const castingRef = doc(db, 'castings', data.castingId);
  await updateDoc(castingRef, { applicantCount: increment(1) });
 
  // Increment talent's total applications
  const talentRef = doc(db, 'talent', data.talentId);
  await updateDoc(talentRef, { totalApplications: increment(1) });
 
  return ref.id;
}
 
// Get all applications for a specific casting (org views applicants)
export async function getCastingApplications(castingId) {
  const q = query(
    collection(db, 'applications'),
    where('castingId', '==', castingId),
    orderBy('appliedAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
 
// Get all applications by a talent (talent views their applications)
export async function getTalentApplications(talentId) {
  const q = query(
    collection(db, 'applications'),
    where('talentId', '==', talentId),
    orderBy('appliedAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
 
// Check if talent already applied to a casting
export async function hasApplied(talentId, castingId) {
  const q = query(
    collection(db, 'applications'),
    where('talentId', '==', talentId),
    where('castingId', '==', castingId)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}
 
// Update application status (org shortlists/rejects/selects)
export async function updateApplicationStatus(applicationId, newStatus) {
  const ref = doc(db, 'applications', applicationId);
  await updateDoc(ref, { status: newStatus, updatedAt: serverTimestamp() });
}
 
// ═══════════════════════════════════════════════════════
// BROWSE TALENT (Phase 3)
// ═══════════════════════════════════════════════════════
 
// Get all visible talent profiles (for org browsing)
// Note: In production with many users, add pagination. For now limit 100.
export async function getAllVisibleTalent() {
  const q = query(
    collection(db, 'talent'),
    orderBy('createdAt', 'desc'),
    limit(100)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
 
// Get a single talent profile by ID (for viewing applicant details)
// Same as getTalentProfile but named clearly for context
export async function getPublicTalentProfile(talentId) {
  return getTalentProfile(talentId);
}