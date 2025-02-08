export default function Preloader({ uniqueKey }) {
    return (
        <div id="preloader" key={uniqueKey}>
            <div id="status">
                <div className="spinner-border text-primary avatar-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}