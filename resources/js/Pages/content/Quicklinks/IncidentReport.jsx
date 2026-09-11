import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import MainLayout from '../../../layouts/MainLayout';

const GREEN = '#157d3c';
const GREEN_DARK = '#0f5c2c';

const actions = [
    {
        icon: 'fa-pen-to-square',
        title: 'Create Report',
        subtitle: 'Submit a new incident',
        desc: 'Fill out the incident report form with details, attachments, and priority level.',
        cta: 'New Report',
    },
    {
        icon: 'fa-gavel',
        title: 'File Appeal',
        subtitle: 'Challenge a decision',
        desc: 'Submit an appeal for a previously closed incident or decision you disagree with.',
        cta: 'Appeal Now',
    },
    {
        icon: 'fa-magnifying-glass',
        title: 'Track Case',
        subtitle: 'Monitor case progress',
        desc: 'Check the status of your reports and appeals with real-time updates.',
        cta: 'Track Now',
    },
];

const stats = [
    { icon: 'fa-clipboard-list', value: '47', label: 'Total Reports', color: '#ea580c' },
    { icon: 'fa-hourglass-half', value: '12', label: 'Pending Review', color: '#eab308' },
    { icon: 'fa-circle-check', value: '31', label: 'Resolved', color: GREEN },
    { icon: 'fa-chart-simple', value: '89%', label: 'Resolution Rate', color: '#2563eb' },
];

const incidentTypes = [
    'Bullying / Harassment',
    'Property Damage',
    'Theft',
    'Academic Misconduct',
    'Safety Concern',
    'Other',
];

const priorityOptions = [
    { value: 'Low', label: 'Low - Minor issue' },
    { value: 'Medium', label: 'Medium - Needs attention' },
    { value: 'High', label: 'High - Urgent' },
];

const initialReportForm = {
    fullName: '',
    studentId: '',
    email: '',
    contactNumber: '',
    incidentType: '',
    dateOfIncident: '',
    location: '',
    description: '',
    priority: 'Medium',
    file: null,
    confirmed: false,
};

const initialAppealForm = {
    fullName: '',
    studentId: '',
    email: '',
    contactNumber: '',
    referenceNumber: '',
    decisionAppealed: '',
    reason: '',
    file: null,
    confirmed: false,
};

const inputClass = (error) =>
    `w-full px-3.5 py-2.5 rounded-md border text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${
        error
            ? 'border-red-400 focus:ring-red-200'
            : 'border-gray-300 focus:ring-[#157d3c]/30 focus:border-[#157d3c]'
    }`;

const Field = ({ label, error, children }) => (
    <div>
        <label className="block text-sm font-bold text-gray-800 mb-1.5">{label}</label>
        {children}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
);

const ModalShell = ({ icon, title, onClose, submitting, children, footer, maxWidth = 'max-w-2xl' }) => (
    <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
    >
        <div
            className="absolute inset-0 bg-black/60"
            onClick={submitting ? undefined : onClose}
        />

        <motion.div
            className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-hidden flex flex-col`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between px-6 py-5 shrink-0"
                style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
            >
                <div className="flex items-center gap-3">
                    <i className={`fas ${icon} text-white text-lg`} />
                    <h2
                        className="text-white font-bold text-lg"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                    >
                        {title}
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    disabled={submitting}
                    className="text-white/80 hover:text-white transition-colors text-xl leading-none disabled:opacity-40"
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>

            {children}

            {footer}
        </motion.div>
    </motion.div>
);

const IncidentReport = () => {
    // ---- Modal open states ----
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
    const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

    // ---- Create Report form state ----
    const [reportForm, setReportForm] = useState(initialReportForm);
    const [reportErrors, setReportErrors] = useState({});
    const [reportSubmitting, setReportSubmitting] = useState(false);

    // ---- File Appeal form state ----
    const [appealForm, setAppealForm] = useState(initialAppealForm);
    const [appealErrors, setAppealErrors] = useState({});
    const [appealSubmitting, setAppealSubmitting] = useState(false);

    // ---- Track Case state ----
    const [trackQuery, setTrackQuery] = useState('');
    const [trackSubmitting, setTrackSubmitting] = useState(false);
    const [trackResult, setTrackResult] = useState(null);
    const [trackError, setTrackError] = useState('');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.12 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const cardHover = {
        rest: { y: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' },
        hover: { y: -6, boxShadow: '0 16px 34px rgba(21,125,60,0.18)', transition: { duration: 0.25, ease: 'easeOut' } },
    };

    const ctaPillProps = {
        style: { backgroundColor: '#e7f6ec', color: GREEN },
        onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = GREEN;
            e.currentTarget.style.color = '#ffffff';
        },
        onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = '#e7f6ec';
            e.currentTarget.style.color = GREEN;
        },
    };

    const openModalFor = (title) => {
        if (title === 'Create Report') setIsCreateModalOpen(true);
        if (title === 'File Appeal') setIsAppealModalOpen(true);
        if (title === 'Track Case') setIsTrackModalOpen(true);
    };

    // ===================== CREATE REPORT =====================
    const handleReportChange = (field) => (e) => {
        const value = field === 'file' ? e.target.files?.[0] || null : e.target.value;
        setReportForm((prev) => ({ ...prev, [field]: value }));
        if (reportErrors[field]) setReportErrors((prev) => ({ ...prev, [field]: null }));
    };

    const handleReportCheckbox = (e) => {
        setReportForm((prev) => ({ ...prev, confirmed: e.target.checked }));
        if (reportErrors.confirmed) setReportErrors((prev) => ({ ...prev, confirmed: null }));
    };

    const validateReport = () => {
        const next = {};
        if (!reportForm.fullName.trim()) next.fullName = 'Full name is required.';
        if (!reportForm.email.trim()) next.email = 'Email address is required.';
        if (!reportForm.incidentType) next.incidentType = 'Please select an incident type.';
        if (!reportForm.dateOfIncident) next.dateOfIncident = 'Date of incident is required.';
        if (!reportForm.location.trim()) next.location = 'Location is required.';
        if (!reportForm.description.trim()) next.description = 'Please describe what happened.';
        if (!reportForm.confirmed) next.confirmed = 'You must confirm the information is accurate.';
        setReportErrors(next);
        return Object.keys(next).length === 0;
    };

    const closeReportModal = () => {
        setReportForm(initialReportForm);
        setReportErrors({});
        setIsCreateModalOpen(false);
    };

    const handleSubmitReport = async (e) => {
        e.preventDefault();
        if (!validateReport()) return;

        setReportSubmitting(true);
        try {
            // TODO: await router.post('/incident-report', reportForm, { forceFormData: true });
            console.log('Submitted report:', reportForm);
            closeReportModal();
        } catch (err) {
            console.error('Failed to submit incident report:', err);
        } finally {
            setReportSubmitting(false);
        }
    };

    // ===================== FILE APPEAL =====================
    const handleAppealChange = (field) => (e) => {
        const value = field === 'file' ? e.target.files?.[0] || null : e.target.value;
        setAppealForm((prev) => ({ ...prev, [field]: value }));
        if (appealErrors[field]) setAppealErrors((prev) => ({ ...prev, [field]: null }));
    };

    const handleAppealCheckbox = (e) => {
        setAppealForm((prev) => ({ ...prev, confirmed: e.target.checked }));
        if (appealErrors.confirmed) setAppealErrors((prev) => ({ ...prev, confirmed: null }));
    };

    const validateAppeal = () => {
        const next = {};
        if (!appealForm.fullName.trim()) next.fullName = 'Full name is required.';
        if (!appealForm.email.trim()) next.email = 'Email address is required.';
        if (!appealForm.referenceNumber.trim()) next.referenceNumber = 'Reference/Incident number is required.';
        if (!appealForm.decisionAppealed.trim()) next.decisionAppealed = 'Please describe the decision being appealed.';
        if (!appealForm.reason.trim()) next.reason = 'Please explain your reason for appeal.';
        if (!appealForm.confirmed) next.confirmed = 'You must acknowledge this before submitting.';
        setAppealErrors(next);
        return Object.keys(next).length === 0;
    };

    const closeAppealModal = () => {
        setAppealForm(initialAppealForm);
        setAppealErrors({});
        setIsAppealModalOpen(false);
    };

    const handleSubmitAppeal = async (e) => {
        e.preventDefault();
        if (!validateAppeal()) return;

        setAppealSubmitting(true);
        try {
            // TODO: await router.post('/incident-report/appeal', appealForm, { forceFormData: true });
            console.log('Submitted appeal:', appealForm);
            closeAppealModal();
        } catch (err) {
            console.error('Failed to submit appeal:', err);
        } finally {
            setAppealSubmitting(false);
        }
    };

    // ===================== TRACK CASE =====================
    const closeTrackModal = () => {
        setTrackQuery('');
        setTrackResult(null);
        setTrackError('');
        setIsTrackModalOpen(false);
    };

    const handleTrackSubmit = async (e) => {
        e.preventDefault();
        if (!trackQuery.trim()) {
            setTrackError('Please enter a reference number.');
            return;
        }

        setTrackError('');
        setTrackSubmitting(true);
        try {
            // TODO: const res = await fetch(`/api/incident-report/track/${trackQuery}`);
            // const data = await res.json();
            // setTrackResult(data);
            console.log('Tracking case:', trackQuery);
            setTrackResult({ status: 'Not found', reference: trackQuery });
        } catch (err) {
            console.error('Failed to track case:', err);
            setTrackError('Something went wrong. Please try again.');
        } finally {
            setTrackSubmitting(false);
        }
    };

    return (
        <MainLayout showTitle={false} maxWidth="full" containerClassName="px-0" mainClassName="py-6 md:py-8" className="bg-transparent">
            <motion.div className="max-w-6xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">

                {/* Hero */}
                <motion.div className="text-center mb-14 px-4" variants={itemVariants}>
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                        variants={titleVariants}
                    >
                        Incident Reporting <span style={{ color: GREEN }}>System</span>
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        variants={titleVariants}
                        transition={{ delay: 0.1 }}
                    >
                        Select an option below to get started with your incident report, appeal, or case tracking.
                    </motion.p>
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-[#f59e0b] to-[#eab308] rounded-full mx-auto mt-4"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </motion.div>

                {/* Action Cards */}
                <motion.section className="mb-16 px-4" variants={itemVariants}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {actions.map((action) => (
                            <motion.div
                                key={action.title}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
                                variants={cardHover}
                                initial="rest"
                                whileHover="hover"
                            >
                                <div
                                    className="px-6 py-10 text-center"
                                    style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_DARK} 100%)` }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
                                        <i className={`fas ${action.icon} text-white text-2xl`} />
                                    </div>
                                    <h3
                                        className="text-white font-extrabold text-xl mb-1"
                                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                                    >
                                        {action.title}
                                    </h3>
                                    <p className="text-white/85 text-sm">{action.subtitle}</p>
                                </div>

                                <div className="flex-1 flex flex-col items-center text-center px-6 py-8">
                                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{action.desc}</p>

                                    <button
                                        type="button"
                                        onClick={() => openModalFor(action.title)}
                                        className="mt-auto inline-block px-5 py-2 rounded-full font-bold text-sm transition-colors duration-200"
                                        {...ctaPillProps}
                                    >
                                        {action.cta}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Analytics Overview */}
                <motion.section className="mb-6 px-4" variants={itemVariants}>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <i className="fas fa-chart-column text-gray-400 text-sm" />
                        <span className="text-xs font-bold tracking-[0.15em] text-gray-400 uppercase">
                            Analytics Overview
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {stats.map((s) => (
                            <motion.div
                                key={s.label}
                                className="bg-white rounded-2xl border border-gray-100 p-6 text-center"
                                variants={cardHover}
                                initial="rest"
                                whileHover="hover"
                            >
                                <i className={`fas ${s.icon} text-2xl mb-3`} style={{ color: s.color }} />
                                <div
                                    className="text-3xl font-extrabold mb-1"
                                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: s.color }}
                                >
                                    {s.value}
                                </div>
                                <p className="text-sm text-gray-500">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </motion.div>

            {/* ================= CREATE REPORT MODAL ================= */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <ModalShell
                        icon="fa-pen-to-square"
                        title="Create Incident Report"
                        onClose={closeReportModal}
                        submitting={reportSubmitting}
                        footer={
                            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
                                <button
                                    type="button"
                                    onClick={closeReportModal}
                                    disabled={reportSubmitting}
                                    className="px-5 py-2 rounded-md bg-gray-500 text-white text-sm font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmitReport}
                                    disabled={reportSubmitting}
                                    className="px-5 py-2 rounded-md text-white text-sm font-semibold transition-colors disabled:opacity-60"
                                    style={{ backgroundColor: GREEN_DARK }}
                                >
                                    {reportSubmitting ? 'Submitting...' : 'Submit Report'}
                                </button>
                            </div>
                        }
                    >
                        <form onSubmit={handleSubmitReport} className="overflow-y-auto px-6 py-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Full Name" error={reportErrors.fullName}>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={reportForm.fullName}
                                        onChange={handleReportChange('fullName')}
                                        className={inputClass(reportErrors.fullName)}
                                    />
                                </Field>

                                <Field label="Student/Employee ID">
                                    <input
                                        type="text"
                                        placeholder="Enter your ID number"
                                        value={reportForm.studentId}
                                        onChange={handleReportChange('studentId')}
                                        className={inputClass()}
                                    />
                                </Field>

                                <Field label="Email Address" error={reportErrors.email}>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={reportForm.email}
                                        onChange={handleReportChange('email')}
                                        className={inputClass(reportErrors.email)}
                                    />
                                </Field>

                                <Field label="Contact Number">
                                    <input
                                        type="tel"
                                        placeholder="09XX XXX XXXX"
                                        value={reportForm.contactNumber}
                                        onChange={handleReportChange('contactNumber')}
                                        className={inputClass()}
                                    />
                                </Field>

                                <Field label="Incident Type" error={reportErrors.incidentType}>
                                    <select
                                        value={reportForm.incidentType}
                                        onChange={handleReportChange('incidentType')}
                                        className={inputClass(reportErrors.incidentType)}
                                    >
                                        <option value="">Select incident type</option>
                                        {incidentTypes.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </Field>

                                <Field label="Date of Incident" error={reportErrors.dateOfIncident}>
                                    <input
                                        type="date"
                                        value={reportForm.dateOfIncident}
                                        onChange={handleReportChange('dateOfIncident')}
                                        className={inputClass(reportErrors.dateOfIncident)}
                                    />
                                </Field>
                            </div>

                            <Field label="Location of Incident" error={reportErrors.location}>
                                <input
                                    type="text"
                                    placeholder="Building, Room, or Specific Location"
                                    value={reportForm.location}
                                    onChange={handleReportChange('location')}
                                    className={inputClass(reportErrors.location)}
                                />
                            </Field>

                            <Field label="Description of Incident" error={reportErrors.description}>
                                <textarea
                                    rows={4}
                                    placeholder="Provide a detailed description of what happened..."
                                    value={reportForm.description}
                                    onChange={handleReportChange('description')}
                                    className={inputClass(reportErrors.description) + ' resize-y'}
                                />
                            </Field>

                            <Field label="Priority Level">
                                <select
                                    value={reportForm.priority}
                                    onChange={handleReportChange('priority')}
                                    className={inputClass()}
                                >
                                    {priorityOptions.map((p) => (
                                        <option key={p.value} value={p.value}>{p.label}</option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Supporting Documents (Optional)">
                                <div className="flex items-center gap-3">
                                    <label className="px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors">
                                        Choose Files
                                        <input type="file" onChange={handleReportChange('file')} className="hidden" />
                                    </label>
                                    <span className="text-sm text-gray-500 truncate">
                                        {reportForm.file ? reportForm.file.name : 'No file chosen'}
                                    </span>
                                </div>
                            </Field>

                            <div>
                                <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={reportForm.confirmed}
                                        onChange={handleReportCheckbox}
                                        className="mt-0.5"
                                    />
                                    I confirm that the information provided is true and accurate.
                                </label>
                                {reportErrors.confirmed && (
                                    <p className="text-xs text-red-600 mt-1">{reportErrors.confirmed}</p>
                                )}
                            </div>
                        </form>
                    </ModalShell>
                )}
            </AnimatePresence>

            {/* ================= FILE APPEAL MODAL ================= */}
            <AnimatePresence>
                {isAppealModalOpen && (
                    <ModalShell
                        icon="fa-gavel"
                        title="File an Appeal"
                        onClose={closeAppealModal}
                        submitting={appealSubmitting}
                        footer={
                            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
                                <button
                                    type="button"
                                    onClick={closeAppealModal}
                                    disabled={appealSubmitting}
                                    className="px-5 py-2 rounded-md bg-gray-500 text-white text-sm font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmitAppeal}
                                    disabled={appealSubmitting}
                                    className="px-5 py-2 rounded-md text-white text-sm font-semibold transition-colors disabled:opacity-60"
                                    style={{ backgroundColor: GREEN_DARK }}
                                >
                                    {appealSubmitting ? 'Submitting...' : 'Submit Appeal'}
                                </button>
                            </div>
                        }
                    >
                        <form onSubmit={handleSubmitAppeal} className="overflow-y-auto px-6 py-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field label="Full Name" error={appealErrors.fullName}>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={appealForm.fullName}
                                        onChange={handleAppealChange('fullName')}
                                        className={inputClass(appealErrors.fullName)}
                                    />
                                </Field>

                                <Field label="Student/Employee ID">
                                    <input
                                        type="text"
                                        placeholder="Enter your ID number"
                                        value={appealForm.studentId}
                                        onChange={handleAppealChange('studentId')}
                                        className={inputClass()}
                                    />
                                </Field>

                                <Field label="Email Address" error={appealErrors.email}>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={appealForm.email}
                                        onChange={handleAppealChange('email')}
                                        className={inputClass(appealErrors.email)}
                                    />
                                </Field>

                                <Field label="Contact Number">
                                    <input
                                        type="tel"
                                        placeholder="09XX XXX XXXX"
                                        value={appealForm.contactNumber}
                                        onChange={handleAppealChange('contactNumber')}
                                        className={inputClass()}
                                    />
                                </Field>
                            </div>

                            <Field label="Reference/Incident Number" error={appealErrors.referenceNumber}>
                                <input
                                    type="text"
                                    placeholder="Enter the incident reference number"
                                    value={appealForm.referenceNumber}
                                    onChange={handleAppealChange('referenceNumber')}
                                    className={inputClass(appealErrors.referenceNumber)}
                                />
                            </Field>

                            <Field label="Decision Being Appealed" error={appealErrors.decisionAppealed}>
                                <textarea
                                    rows={3}
                                    placeholder="Describe the decision or action you are appealing..."
                                    value={appealForm.decisionAppealed}
                                    onChange={handleAppealChange('decisionAppealed')}
                                    className={inputClass(appealErrors.decisionAppealed) + ' resize-y'}
                                />
                            </Field>

                            <Field label="Reason for Appeal" error={appealErrors.reason}>
                                <textarea
                                    rows={4}
                                    placeholder="Explain why you believe the decision should be reconsidered..."
                                    value={appealForm.reason}
                                    onChange={handleAppealChange('reason')}
                                    className={inputClass(appealErrors.reason) + ' resize-y'}
                                />
                            </Field>

                            <Field label="Supporting Evidence (Optional)">
                                <div className="flex items-center gap-3">
                                    <label className="px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors">
                                        Choose Files
                                        <input type="file" onChange={handleAppealChange('file')} className="hidden" />
                                    </label>
                                    <span className="text-sm text-gray-500 truncate">
                                        {appealForm.file ? appealForm.file.name : 'No file chosen'}
                                    </span>
                                </div>
                            </Field>

                            <div>
                                <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={appealForm.confirmed}
                                        onChange={handleAppealCheckbox}
                                        className="mt-0.5"
                                    />
                                    I understand that this appeal will be reviewed by the appropriate committee.
                                </label>
                                {appealErrors.confirmed && (
                                    <p className="text-xs text-red-600 mt-1">{appealErrors.confirmed}</p>
                                )}
                            </div>
                        </form>
                    </ModalShell>
                )}
            </AnimatePresence>

            {/* ================= TRACK CASE MODAL ================= */}
            <AnimatePresence>
                {isTrackModalOpen && (
                    <ModalShell
                        icon="fa-magnifying-glass"
                        title="Track Your Case"
                        onClose={closeTrackModal}
                        submitting={trackSubmitting}
                        maxWidth="max-w-xl"
                        footer={null}
                    >
                        <form onSubmit={handleTrackSubmit} className="px-6 py-6 space-y-4">
                            <div className="flex items-stretch gap-0 rounded-full overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-[#157d3c]/30 focus-within:border-[#157d3c]">
                                <input
                                    type="text"
                                    placeholder="Enter reference or case number"
                                    value={trackQuery}
                                    onChange={(e) => {
                                        setTrackQuery(e.target.value);
                                        if (trackError) setTrackError('');
                                    }}
                                    className="flex-1 px-5 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={trackSubmitting}
                                    className="px-6 flex items-center gap-2 text-white text-sm font-semibold whitespace-nowrap disabled:opacity-60"
                                    style={{ backgroundColor: GREEN_DARK }}
                                >
                                    <i className="fas fa-magnifying-glass text-xs" />
                                    {trackSubmitting ? 'Tracking...' : 'Track'}
                                </button>
                            </div>

                            {trackError && <p className="text-xs text-red-600">{trackError}</p>}

                            {trackResult && (
                                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                                    <p>
                                        <span className="font-semibold">Reference:</span> {trackResult.reference}
                                    </p>
                                    <p className="mt-1">
                                        <span className="font-semibold">Status:</span> {trackResult.status}
                                    </p>
                                </div>
                            )}
                        </form>
                    </ModalShell>
                )}
            </AnimatePresence>
        </MainLayout>
    );
};

export default IncidentReport;
