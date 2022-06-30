import './topbar.css';
function TopBar() {
    return (
        <div className='topbar'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
 
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="#">Historical Data</a>
                            <a className="nav-link" href="#">Download CSV</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default TopBar;