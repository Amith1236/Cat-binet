// Dashboard.js
function Dashboard() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/medicines')
            .then(res => res.json())
            .then(data => setMedicines(data));
    }, []);

    const handleUnlock = async () => {
        setLoading(true);
        try {
            await fetch('/api/cabinet/unlock', { method: 'POST' });
            // Show success notification
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Medicine Cabinet</h1>
            <button onClick={handleUnlock} disabled={loading}>
                {loading ? 'Unlocking...' : 'Unlock Cabinet'}
            </button>
            
            <div className="medicine-list">
                {medicines.map(med => (
                    <div key={med.id} className="medicine-card">
                        <h3>{med.name}</h3>
                        <p>Expiry: {new Date(med.expiry_date).toLocaleDateString()}</p>
                        <p>Remaining: {calculateDaysRemaining(med)} days</p>
                        <p>Restock in: {calculateRestockDays(med)} days</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function calculateDaysRemaining(medicine) {
    const days = Math.floor(medicine.quantity / medicine.daily_intake);
    return Math.max(days, 0);
}

function calculateRestockDays(medicine) {
    const daysRemaining = calculateDaysRemaining(medicine);
    const expiryDays = (new Date(medicine.expiry_date) - new Date()) / (1000*60*60*24);
    return Math.min(daysRemaining, Math.floor(expiryDays)) - 7; // 7 day buffer
}