import JournalBooksPage from './JournalBooksPage';
import mindanaoJournal2026Cover from '../../../assets/RITTS/Mindanao Journal of Alternative Education Studies Vol. 3 No.1 (2026).png';
import mjaesPdf01 from '../../../assets/RITTS/MJAE/MJAES-01.pdf';
import mjaesPdf02 from '../../../assets/RITTS/MJAE/MJAES-02.pdf';
import mjaesPdf03 from '../../../assets/RITTS/MJAE/MJAES-03.pdf';
import mjaesPdf04 from '../../../assets/RITTS/MJAE/MJAES-04.pdf';
import mjaesPdf05 from '../../../assets/RITTS/MJAE/MJAES-05.pdf';
import mjaesPdf06 from '../../../assets/RITTS/MJAE/MJAES-06.pdf';
import mjaesPdf07 from '../../../assets/RITTS/MJAE/MJAES-07.pdf';
import mjaesPdf08 from '../../../assets/RITTS/MJAE/MJAES-08.pdf';
import mjaesPdf09 from '../../../assets/RITTS/MJAE/MJAES-09.pdf';

const articles = [
    {
        title: "Institutional and Learners' Perspectives on the Implementation of ALS SHS Programs in Jail Facilities: A Qualitative Inquiry",
        doi: '10.17613/menyd-b0109',
        pdf: mjaesPdf01,
    },
    {
        title: 'Project ABANIL: Bridging Foundational Learning Gaps to Improve Accreditation and Equivalency Performance among ALS Learners',
        doi: '10.17613/z7f44-mcj96',
        pdf: mjaesPdf02,
    },
    {
        title: 'Integrating Digital Tools in the Alternative Learning System: A Quasi-Experimental Study on Digital Citizenship and Learner Performance',
        doi: '10.17613/x029n-29d36',
        pdf: mjaesPdf03,
    },
    {
        title: 'Improving Learner Completion in the Alternative Learning System: Evidence-Based Inputs for an Intervention Program in SDO Misamis Occidental',
        doi: '10.17613/k4823-26s13',
        pdf: mjaesPdf04,
    },
    {
        title: 'Assessing Blended Learning Readiness among ALS Senior High School Learners: Evidence from Bukidnon Province',
        doi: '10.17613/yql7d-qxb28',
        pdf: mjaesPdf05,
    },
    {
        title: 'An Ecological Systems Analysis of Functional Literacy and Learning Gaps among Non-Enrolled Populations in Northern Mindanao',
        doi: '10.17613/tssn9-fv992',
        pdf: mjaesPdf06,
    },
    {
        title: 'Understanding the Challenges of ALS Delivery: A Three-Domain Analysis of Teaching, Resources, and Learner Mindsets',
        doi: '10.17613/bqf33-epf68',
        pdf: mjaesPdf07,
    },
    {
        title: 'Lived Experiences of Students and Implementers in the Pilot Implementation of the Academic-Focused Bridging Program',
        doi: '10.17613/2kpj4-ztb68',
        pdf: mjaesPdf08,
    },
    {
        title: 'Mental Well-Being and A&E Test Readiness among Alternative Learning System Learners',
        doi: '10.17613/9vkl9m-kad12',
        pdf: mjaesPdf09,
    },
];

const books = [
    {
        id: 'mjaes-2026',
        edition: 'Volume 3, No. 1',
        year: '2026',
        cover: mindanaoJournal2026Cover,
        alt: 'Mindanao Journal of Alternative Education Studies, Volume 3, No. 1 (2026)',
        articles,
    },
];

export default function MindanaoJournal() {
    return (
        <JournalBooksPage
            title="Mindanao Journal of Alternative Education"
            description="Consistent with the National ALS Research Agenda 2022-2026, the journal seeks to publish original research articles, review articles, and case studies on a range of topics related to alternative learning systems, such as curriculum development, teaching and learning strategies, assessment and evaluation, educational technology, and policy and management issues. The journal also encourages submissions that explore innovative approaches to teaching and learning, as well as research that examines the effectiveness of alternative learning systems in improving access to education and promoting lifelong learning."
            books={books}
        />
    );
}
