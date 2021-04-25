import React, { useEffect, useState } from 'react';
import { attackService } from './../services/attackService';
import Loading from './../cmps/Loading';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { exportDoc } from './../services/exportContentToDocx';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCommonTagAttacks } from './../store/actions/attackAction';


export function AttackDetails(props) {

    const [attack, setAttack] = useState(null);
    const { attacks } = useSelector(state => state.attackModule);
    const dispatch = useDispatch();
    useEffect(() => {
        loadAttack()
    }, [])

    const loadAttack = async () => {
        const { attackId } = props.match.params;
        const attack = await attackService.getAttackById(attackId);
        setAttack(attack);
    }

    const onSearchDataSource = (dataSource) => {
        const attacksWithDataSource = attacks.filter((attack) => {
            if (!attack.objects[0].x_mitre_data_sources) return false;
            return attack.objects[0].x_mitre_data_sources.includes(dataSource)
        })
        dispatch(setCommonTagAttacks(attacksWithDataSource, dataSource));
        props.history.push('/')
    }

    if (!attack) return <Loading />;
    const { name, created, description, id, modified, x_mitre_contributors, kill_chain_phases,
        x_mitre_data_sources, x_mitre_detection, x_mitre_permissions_required,
        x_mitre_platforms } = attack.objects[0];
    return (

        <section className="details-container max-layout">
            <div className="details-actions">
                <Link to="/">
                    <Button variant="contained">Back</Button>
                </Link>
                {attack.objects[0].x_mitre_detection && <div>
                    <Button onClick={() => exportDoc(attack)}
                        variant="contained">Export as .docx</Button>
                </div>}
            </div>

            <h1>{name}</h1>
            <div>
                <strong>Created:</strong> <span>{moment(created).calendar()}</span>
            </div>
            <div>
                <strong>Modified:</strong> <span>{moment(modified).calendar()}</span>
            </div>
            <div>
                <strong>Id: </strong> <span>{id}</span>
            </div>
            <div>
                {kill_chain_phases ? <div> <strong>phase name:
                     </strong> <span>{kill_chain_phases[0].phase_name}</span></div>
                    : <div><strong>kill_chain_phases</strong> <span>: NA</span> </div>}
            </div>

            <div>
                {x_mitre_platforms &&
                    <div className="inline"> <span className="headline">{`Platforms:`}</span>
                        <div >{x_mitre_platforms.map((platform) => {
                            return <span key={platform}>{` ${platform} `}</span>
                        })}</div>
                    </div>}
            </div>
            <div>
                {x_mitre_permissions_required &&
                    <div className="inline"> <span className="headline">Permissions:</span>
                        <div >{x_mitre_permissions_required.map((permission) => {
                            return <span key={permission}>{` ${permission} `}</span>
                        })}</div>
                    </div>}
            </div>

            <div>
                {description &&
                    <div> <span className="headline">Description:</span> <p>{description}</p>
                    </div>}
            </div>
            <div>
                {x_mitre_detection &&
                    <div> <span className="headline">Detection:</span> <p>{x_mitre_detection}</p>
                    </div>}
            </div>
            <div>
                {x_mitre_data_sources &&
                    <div className="inline"> <span className="headline">Data Sources(tags):</span>

                        <div >{x_mitre_data_sources.map((data) => {
                            return <span onClick={() => onSearchDataSource(data)}
                                className="data-source-tag" key={data}>{`#${data}`} </span>
                        })}</div>
                    </div>}

            </div>
            <div>
                {attack.objects[0].external_references[0] &&
                    <div className="inline"> <span className="headline">Read more:</span>
                        <a target="_blank" rel="noopener noreferrer"
                            href={attack.objects[0].external_references[0].url}>
                            {attack.objects[0].external_references[0].url}
                        </a>
                    </div>}
            </div>

            <div>
                {x_mitre_contributors &&
                    <div className="inline"> <span className="headline">Contributors:</span>
                        <div >{x_mitre_contributors.map((contributor) => {
                            return <span key={contributor}>{` ${contributor} `}</span>
                        })}</div>
                    </div>}
            </div>
            <div className="export-btn">

            </div>


        </section>
    )
}
