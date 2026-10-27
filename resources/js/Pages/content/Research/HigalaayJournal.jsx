import JournalBooksPage from './JournalBooksPage';
import higalaay2024Cover from '../../../assets/RITTS/Higalaay Multidisciplinary Research Abstract Vol 1 No.1 (2024).png';
import higalaay2025Cover from '../../../assets/RITTS/Higalaay Multidisciplinary Research Abstract Vol 2 No.1 (2025).png';
import higalaay2024Pdf from '../../../assets/RITTS/HIGALAAY/Higalaay-Multidisciplinary-Research-Abstract-2024.pdf';
import higalaay2025Pdf from '../../../assets/RITTS/HIGALAAY/Higalaay-Multidisciplinary-Research-Abstracts-2025.pdf';

const books = [
    {
        id: 'higalaay-2024',
        edition: 'Volume 1, No. 1',
        year: '2024',
        cover: higalaay2024Cover,
        alt: 'Higalaay Multidisciplinary Research Abstract, Volume 1, No. 1 (2024)',
        pdf: higalaay2024Pdf,
    },
    {
        id: 'higalaay-2025',
        edition: 'Volume 2, No. 1',
        year: '2025',
        cover: higalaay2025Cover,
        alt: 'Higalaay Multidisciplinary Research Abstract, Volume 2, No. 1 (2025)',
        pdf: higalaay2025Pdf,
    },
];

export default function HigalaayJournal() {
    return (
        <JournalBooksPage
            title="Higalaay Multidisciplinary Research Abstract"
            books={books}
        />
    );
}
